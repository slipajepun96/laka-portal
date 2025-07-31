<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lot;
use App\Models\Allottee;
use App\Models\Ownership;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\LotsImport;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class TransactionController extends Controller
{
    public function transactionIndex(): Response
    {
        return Inertia::render('Administrator/Transaction/TransactionIndex', [
            // 'transactions' => [], // Placeholder for transactions data
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
            $lot->latest_allottee_name = $latestOwnership?->allottee?->allottee_name ?? '-';
            $lot->latest_allottee_nric = $latestOwnership?->allottee?->allottee_nric ?? '-';
            $lot->latest_allottee_id = $latestOwnership?->allottee?->id ?? '-';
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

        // dd($request->all());
     try {
        // Validate the request
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
        // Log the request data for debugging
        \Log::info('Transaction request:', [
            'data' => $request->all(),
            'validation_passed' => true
        ]);

        // Start database transaction
        DB::beginTransaction();
        try {
            // Your transaction saving logic here
            // ...

            DB::commit();
            return redirect()->back()->with('success', 'Transactions saved successfully');
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
