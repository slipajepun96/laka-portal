<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lot;
use App\Models\Allottee;
use App\Models\Ownership;
use App\Models\Transaction;
use App\Models\TransactionList;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\LotsImport;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class TransactionController extends Controller
{
    public function transactionIndex(): Response
    {
        $transactions = Transaction::all();
        // dd($transactions);

        return Inertia::render('Administrator/Transaction/TransactionIndex', [
            'transactions' => $transactions,
        ]);
    }

    public function transactionViewAddBulk():Response
    {
        $lots = Lot::with(['ownerships' => function($q) {
            $q->orderByDesc('ownership_start_date'); // or 'created_at'
        }, 'ownerships.allottee'])->get();

        // Add latest allottee name to each lot
        $lots = $lots->map(function($lot) {
            $latestOwnership = $lot->ownerships->first();
            $lot->latest_allottee_name = $latestOwnership?->allottee?->allottee_name ?? "-";
            $lot->latest_allottee_nric = $latestOwnership?->allottee?->allottee_nric ?? "-";
            $lot->latest_allottee_id = $latestOwnership?->allottee?->id ?? "-";
            return $lot;
        });

        // dd($lots[3]);
        return Inertia::render('Administrator/Transaction/TransactionAddBulkTransaction', [
            'lots' => $lots,
            // 'allottees' => $allottees,
        ]);
    }

    public function transactionSaveBulk(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'transaction_name' => 'required|string',
                'transaction_posted_date' => 'required|date',
                'transaction_type' => 'required|string|in:debit,credit,notice',
                'transactions' => 'required|array',
                // 'transactions.*.lot_id' => 'required|exists:lots,id',
                // 'transactions.*.allottee_id' => 'required|exists:allottees,id',
                // 'transactions.*.amount' => 'required|numeric|min:0',
            ]);

            // dd($validated);
            // \Log::info('Transaction request:', [
            //     'data' => $request->all(),
            //     'validation_passed' => true
            // ]);

            DB::beginTransaction();
            try {
                // asingkan dari lot yang takde org, save yang ada je

                // save ibu transaction dulu
                $transaction = new Transaction();
                $transaction->transaction_name = $validated['transaction_name'];
                $transaction->transaction_posted_date = $validated['transaction_posted_date'];
                $transaction->transaction_type = $validated['transaction_type'];
                $transaction->save();

                $transaction_id = $transaction->id;
                // dd($validated['transactions']);
                // $i=0;   
                $transaction_list_all = [];

                foreach($validated['transactions'] as $transaction_list) 
                {
                    if(
                        isset($transaction_list['allottee_id']) &&
                        !empty($transaction_list['allottee_id']) &&
                        $transaction_list['allottee_id'] !== '-')
                    {
                        // //debug 
                        // $hahaha[$i][0] = $transaction_list['allottee_id'];
                        // $hahaha[$i][1] = $transaction_list['lot_id'];
                        // $hahaha[i][2] = $transaction_list['allottee_id'];
                        // dd("test");
                        $transaction_list_all[] = [
                            'id' => Str::uuid(),
                            'lot_id' => $transaction_list['lot_id'],
                            'allottee_id' => $transaction_list['allottee_id'],
                            'transaction_id' => $transaction_id,
                            'transaction_type' => $validated['transaction_type'],
                            'transaction_name' => $validated['transaction_name'],
                            'transaction_posted_date' => $validated['transaction_posted_date'],
                            'transaction_amount' => $transaction_list['amount'],
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                        // dd($transaction_list_all);

                    }
                    // $i++;
                }
                // dd($transaction_list_all);
                if (!empty($transaction_list_all)) {
                    TransactionList::insert($transaction_list_all);
                }

                DB::commit();
                return redirect()->route('transaction.index')->with('success', 'Transaksi berjaya disimpan');
            } catch (\Exception $e) {
                DB::rollBack();
                \Log::error('Database error:', [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return redirect()->back()
                    ->with('error', 'Failed to save transactions')
                    ->withErrors(['database' => $e->getMessage()]);
            }
        } catch (\Exception $e) {
            \Log::error('Validation/Processing error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            dd($e->getMessage());
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()])
                ->with('error', 'An error occurred while processing the transactions')
                ->withInput();
        }
    }

    public function transactionDelete(Request $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            
            // Delete all transaction list entries with this transaction_id
            TransactionList::where('transaction_id', $request->id)->delete();
            
            // Delete the main transaction
            Transaction::findOrFail($request->id)->delete();

            DB::commit();
            return redirect()->back()->with([
                'message' => 'Transaksi berjaya dipadam',
                'type' => 'success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Database error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()
                ->with('error', 'Failed to save transactions')
                ->withErrors(['database' => $e->getMessage()]);
        }
    }
}
