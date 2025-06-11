<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lot;
use App\Models\Allottee;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class AllotteeController extends Controller
{
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
            $allottee->save();

            return redirect()->route('allottee.index')->with('success', 'Peserta berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }
}
