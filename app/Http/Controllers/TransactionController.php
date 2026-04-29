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
use DateTime;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class TransactionController extends Controller
{
    public function transactionIndex(): Response
    {
        $transactions = Transaction::orderByDesc('transaction_posted_date')->get();
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
        // dd("test");
        try {
            $validated = $request->validate([
                'transaction_name' => 'required|string',
                'transaction_posted_date' => 'required|date',
                'transaction_type' => 'required|string|in:debit,credit,balance',
                'transactions' => 'required|array',
                // 'transactions.*.lot_id' => 'required|exists:lots,id',
                // 'transactions.*.allottee_id' => 'required|exists:allottees,id',
                // 'transactions.*.amount' => 'required|numeric|min:0',
            ]);
            

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
        // dd($request->all());
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

    public function transactionView($transactionId): Response
    {
        try {
            $transaction = Transaction::findOrFail($transactionId);

            $transaction_lists = TransactionList::where('transaction_id', $transactionId)
                ->with(['allottee', 'lot']) // Load relationships
                ->get()
                ->map(function($item) {
                    return [
                        'id' => $item->id,
                        'transaction_id' => $item->transaction_id,
                        'lot_id' => $item->lot_id,
                        'allottee_id' => $item->allottee_id,
                        'transaction_amount' => $item->transaction_amount,
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at,
                        // Add related data
                        'allottee_name' => $item->allottee?->allottee_name ?? '-',
                        'allottee_nric' => $item->allottee?->allottee_nric ?? '-',
                        'lot_num' => $item->lot?->lot_num ?? '-',
                    ];
                })->sortBy('lot_num')->values(); 

            

            // $lots = Lot::with(['ownerships' => function($q) {
            //     $q->orderByDesc('ownership_start_date'); // or 'created_at'
            // }, 'ownerships.allottee'])->get();

            // // Add latest allottee name to each lot
            // $lots = $lots->map(function($lot) {
            //     $latestOwnership = $lot->ownerships->first();
            //     $lot->latest_allottee_name = $latestOwnership?->allottee?->allottee_name ?? "-";
            //     $lot->latest_allottee_nric = $latestOwnership?->allottee?->allottee_nric ?? "-";
            //     $lot->latest_allottee_id = $latestOwnership?->allottee?->id ?? "-";
            //     return $lot;
            // });
            // dd($transaction);

            return Inertia::render('Administrator/Transaction/TransactionView', [
                'transaction' => $transaction,
                'transaction_lists' => $transaction_lists,
                // 'allottees' => $allottees,
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to load transaction:', [
                'transaction_id' => $transactionId,
                'error' => $e->getMessage()
            ]);

            $transactions = Transaction::all();

            return Inertia::render('Administrator/Transaction/TransactionIndex', [
                'error' => 'Failed to load transaction details',
                'transactions' => $transactions
            ]);
        }
        $transaction = Transaction::all()->where('id', $transactionId)->first();

    }

    public function transactionViewAddCFBF(): Response
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

        //sort lot by allottee name
        $lots = $lots->sortBy(function($lot) {
            return $lot->latest_allottee_name;
        })->values();

        // dd($lots[3]);
        return Inertia::render('Administrator/Transaction/TransactionAddCFBFTransaction', [
            'lots' => $lots,
            // 'allottees' => $allottees,
        ]);
    }

    public function transactionSaveCFBF(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'cf_year' => 'required|numeric',
                'bf_year' => 'required|numeric',
                'transactions' => 'required|array',
            ]);

            // dd($validated['cf_year'] . "-12-31");
            DB::beginTransaction();
            try {
                //init declare
                $cf_transaction_posted_date = $validated['cf_year'] . "-12-31";//ymd
                $bf_transaction_posted_date = $validated['bf_year'] . "-01-01";//ymd


                //untuk cf year

                // save ibu transaction dulu
                $transaction = new Transaction();
                $transaction->transaction_name = "Carry Forward Tahun " . $validated['cf_year'];
                $transaction->transaction_posted_date = $cf_transaction_posted_date;
                $transaction->transaction_type = "carry_forward";
                $transaction->save();

                $transaction_id = $transaction->id; 
                $transaction_list_all = [];

                foreach($validated['transactions'] as $transaction_list) 
                {
                    if(
                        isset($transaction_list['allottee_id']) &&
                        !empty($transaction_list['allottee_id']) &&
                        $transaction_list['allottee_id'] !== '-')
                    {
                        // //debug 
                        // dd("test");

                        $transaction_list_all[] = [
                            'id' => Str::uuid(),
                            'lot_id' => $transaction_list['lot_id'],
                            'allottee_id' => $transaction_list['allottee_id'],
                            'transaction_id' => $transaction_id,
                            'transaction_type' => "carry_forward",
                            'transaction_name' => "Carry Forward Tahun " . $validated['cf_year'],
                            'transaction_posted_date' => $cf_transaction_posted_date,
                            'transaction_amount' => $transaction_list['amount'],
                            'year' => $validated['cf_year'],
                            'created_at' => now(),
                            // 'updated_at' => now()
                        ];
                        // dd($transaction_list_all);

                    }
                }

                // dd($transaction_list_all);
                if (!empty($transaction_list_all)) {
                    TransactionList::insert($transaction_list_all);
                }


                //untuk BF year========================================================================

                // save ibu transaction dulu
                $transaction = new Transaction();
                $transaction->transaction_name = "Brought Forward Tahun " . $validated['bf_year'];
                $transaction->transaction_posted_date = $bf_transaction_posted_date;
                $transaction->transaction_type = "brought_forward";
                $transaction->save();

                $transaction_id = '';

                $transaction_id = $transaction->id; 
                $transaction_list_all = [];

                foreach($validated['transactions'] as $transaction_list) 
                {
                    if(
                        isset($transaction_list['allottee_id']) &&
                        !empty($transaction_list['allottee_id']) &&
                        $transaction_list['allottee_id'] !== '-')
                    {
                        // //debug 
                        // dd("test");

                        $transaction_list_all[] = [
                            'id' => Str::uuid(),
                            'lot_id' => $transaction_list['lot_id'],
                            'allottee_id' => $transaction_list['allottee_id'],
                            'transaction_id' => $transaction_id,
                            'transaction_type' => "brought_forward",
                            'transaction_name' => "Brought Forward Tahun " . $validated['bf_year'],
                            'transaction_posted_date' => $bf_transaction_posted_date,
                            'transaction_amount' => $transaction_list['amount'],
                            'year' => $validated['bf_year'],
                            'created_at' => now(),
                            // 'updated_at' => now()
                        ];
                        // dd($transaction_list_all);

                    }
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
}
