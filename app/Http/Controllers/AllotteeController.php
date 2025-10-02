<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lot;
use App\Models\Allottee;
use App\Models\TransactionList;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Barryvdh\DomPDF\Facade\Pdf;


ini_set('max_execution_time', 300); // 5 minutes
ini_set('memory_limit', '512M');

class AllotteeController extends Controller
{
    public function allotteeLogin(Request $request)
    {
        $credentials = $request->validate([
            'allottee_nric' => 'required|string',
            'password' => 'required|string',
        ]);


        if (Auth::guard('allottee')->attempt($credentials)) 
        {
            $request->session()->regenerate();
            return redirect('/u');
        }

        return back()->withErrors([
            'allottee_nric' => 'The provided credentials do not match our records.',
            'password' => 'The provided credentials do not match our records.',
        ]);
    }

    public function allotteeLogout(Request $request)
    {
        Auth::guard('allottee')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }

    public function allotteeMain(Request $request)
    {
        $allottee = Auth::guard('allottee')->user();
        $year = $request->input('year', session('selected_year', date('Y')));
        
        $transactions = TransactionList::where('allottee_id', $allottee->id)
            ->whereYear('transaction_posted_date', $year)
            ->orderBy('transaction_posted_date')
            ->get();

        return Inertia::render('Allottee/AllotteeIndex', [
            'allottee' => $allottee,
            'transactions' => $transactions,
            'year' => $year
        ]);
    }

    public function allotteeStatement(Request $request): Response
    {

        $year = $request->input('year', date('Y')); 
        $allottee = Auth::guard('allottee')->user();
        $transactions = TransactionList::where('allottee_id', $allottee->id)->whereYear('transaction_posted_date', $year)->orderBy('transaction_posted_date')->get();

        return redirect()->route('allottee.main')->with([
            'transactions' => $transactions,
            'year' => $year
        ]);
    }

    public function allotteeStatementDownload(Request $request)
    {
        $year = $request->input('year', date('Y'));
        $allottee = Auth::guard('allottee')->user();
        
        $transactions = TransactionList::where('allottee_id', $allottee->id)
            ->whereYear('transaction_posted_date', $year)
            ->orderBy('transaction_posted_date')
            ->get();

        // Calculate running balance
        $balance = 0;
        $transactionsWithBalance = $transactions->map(function ($transaction) use (&$balance) {
            if ($transaction->transaction_type === 'debit') {
                $balance += floatval($transaction->transaction_amount);
            } elseif ($transaction->transaction_type === 'credit') {
                $balance -= floatval($transaction->transaction_amount);
            }
            
            $transaction->running_balance = $balance;
            return $transaction;
        });

        // dd($transactionsWithBalance);
        $pdf = Pdf::loadView('pdf.allottee_statement', [
            'allottee' => $allottee,
            'transactions' => $transactionsWithBalance,
            'year' => $year,
            'final_balance' => $balance,
            'generated_date' => now()->format('d/m/Y')
        ]);
        return $pdf->download('penyata.pdf');
    }

    public function allotteeIndex(Request $request): Response
    {
        $allottees = Allottee::get()->toArray();
        // dd($allottees);
        return Inertia::render('Administrator/Allottee/AllotteeIndex',[
            'allottees' => $allottees
        ]);
    }

    public function allotteeAdd(Request $request): RedirectResponse
    {

        $validatedData = $request->validate([
            'allottee_nric' => 'required|string|max:12',
            'allottee_name' => 'required|string|max:255',
            'allottee_address' => 'nullable|string|max:255',
            'allottee_phone_num' => 'nullable|numeric',
            'allottee_email' => 'nullable|string|max:100',
            'allottee_bank_name' => 'required|string|max:100',
            'allottee_bank_acc_num' => 'required',
        ]);


        try {
            $allottee = new Allottee();
            $allottee->allottee_nric = $validatedData['allottee_nric'];
            $allottee->allottee_name = $validatedData['allottee_name'];
            $allottee->allottee_address = $validatedData['allottee_address'];
            $allottee->allottee_phone_num = $validatedData['allottee_phone_num'];
            $allottee->allottee_email = $validatedData['allottee_email'];
            $allottee->allottee_bank_name = $validatedData['allottee_bank_name'];
            $allottee->allottee_bank_acc_num = $validatedData['allottee_bank_acc_num'];

            $firstName = explode(' ', $allottee->allottee_name ?? '')[0] ?? '';
            $nricNumbers = substr($allottee->allottee_nric ?? '', 6, 6);
            $allottee->password = bcrypt($firstName . $nricNumbers);

            $allottee->save();



            return redirect()->route('allottee.index')->with('success', 'Peserta berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }

    public function allotteeEdit(Request $request): RedirectResponse
    {
        // dd($request->all());

        $validatedData = $request->validate([
            'allottee_nric' => 'required|string|max:12',
            'allottee_name' => 'required|string|max:255',
            'allottee_address' => 'nullable|string|max:255',
            'allottee_phone_num' => 'nullable|numeric',
            'allottee_email' => 'nullable|string|max:100',
            'allottee_bank_name' => 'nullable|string|max:100',
            'allottee_bank_acc_num' => 'nullable',
        ]);


        try {
            $allottee = new Allottee();
            $allottee = Allottee::find($request->id);
            $allottee->allottee_nric = $validatedData['allottee_nric'];
            $allottee->allottee_name = $validatedData['allottee_name'];
            $allottee->allottee_address = $validatedData['allottee_address'];
            $allottee->allottee_phone_num = $validatedData['allottee_phone_num'];
            $allottee->allottee_email = $validatedData['allottee_email'];
            $allottee->allottee_bank_name = $validatedData['allottee_bank_name'];
            $allottee->allottee_bank_acc_num = $validatedData['allottee_bank_acc_num'];

            $firstName = explode(' ', $allottee->allottee_name ?? '')[0] ?? '';
            $nricNumbers = substr($allottee->allottee_nric ?? '', 6, 6);
            $allottee->password = bcrypt($firstName . $nricNumbers);

            $allottee->save();



            return redirect()->route('allottee.index')->with('success', 'Peserta berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }

    public function allotteeGenerateDefaultPassword(Request $request): RedirectResponse
    {
        $allottees = Allottee::all();
        // dd($allottees);
        try {
            foreach ($allottees as $allottee) {
                try {

                    $firstName = explode(' ', $allottee->allottee_name ?? '')[0] ?? '';
                    $nricNumbers = substr($allottee->allottee_nric ?? '', 6, 6);
                    $allottee->password = bcrypt($firstName . $nricNumbers);

                    // update the allottee with the new password
                    $allottee->save();

                } catch (\Exception $e) {
                    \Log::error('Error generating password for allottee ID ' . $allottee->id, [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    continue; // Skip to the next allottee
                }
            }
            return redirect()->route('allottee.index')->with('success', 'Kata laluan peserta berjaya dijana');
        } catch (\Exception $e) {
            \Log::error('Error generating default password for allottees', [
                'message' => $e->getMessage(),
            ]);
            return redirect()->back()->withErrors(['error' => 'An error occurred while generating default passwords.']);
        }
    }
}
