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

class LotController extends Controller
{
    public function lotIndex(Request $request): Response
    {
        // $lots = Lot::orderBy('lot_num')->get()->toArray();

        $lots = Lot::with(['ownerships' => function($q) {
            $q->orderByDesc('ownership_start_date'); // or 'created_at'
        }, 'ownerships.allottee'])->get();

        // Add latest allottee name to each lot
        $lots = $lots->map(function($lot) {
            $latestOwnership = $lot->ownerships->first();
            $lot->latest_allottee_name = $latestOwnership?->allottee?->allottee_name ?? '-';
            $lot->latest_allottee_nric = $latestOwnership?->allottee?->allottee_nric ?? '-';
            return $lot;
        });

        $lot_owner = Ownership::orderBy('lot_id')->get()->toArray();

        $allottees = Allottee::orderBy('allottee_name')->get()->toArray();

        // dd($lots[2]);
        return Inertia::render('Administrator/Lots/LotsIndex',[
            'lots' => $lots,
            'allottees' => $allottees,
        ]);
    }

    public function lotAdd(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'lot_num' => 'required|numeric|max:9999',
            'lot_file_num' => 'nullable|string|max:255',
            'lot_description' => 'nullable|string|max:255',
            'lot_area_size' => 'nullable|numeric',
            'lot_current_administrator_uuid' => 'nullable|string|max:255',
        ]);

        try {
            $lot = new Lot();
            $lot->lot_num = $validatedData['lot_num'];
            $lot->lot_file_num = $validatedData['lot_file_num'];
            $lot->lot_description = $validatedData['lot_description'];
            $lot->lot_area_size = $validatedData['lot_area_size'];
            $lot->lot_current_administrator_uuid = $validatedData['lot_current_administrator_uuid'];
            $lot->save();

            return redirect()->route('lots.index')->with('success', 'Lot berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }

    public function lotEdit(Request $request): RedirectResponse
    {
        $id= $request->id;

        try {
            $lot = Lot::findOrFail($id);
            $validatedData = $request->validate([
                'lot_num' => 'required|numeric|max:9999',
                'lot_file_num' => 'nullable|string|max:255',
                'lot_description' => 'nullable|string|max:255',
                'lot_area_size' => 'nullable|numeric',
                'lot_current_administrator_uuid' => 'nullable|string|max:255',
            ]);

            $lot->lot_num = $validatedData['lot_num'];
            $lot->lot_file_num = $validatedData['lot_file_num'];
            $lot->lot_description = $validatedData['lot_description'];
            $lot->lot_area_size = $validatedData['lot_area_size'];
            $lot->lot_current_administrator_uuid = $validatedData['lot_current_administrator_uuid'];
            $lot->save();

            return redirect()->route('lots.index')->with('success', 'Lot berjaya dikemaskini');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }

    public function lotImportExcel(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        dd($validatedData);


    }

    public function lotAddAllottee(Request $request): RedirectResponse
    {
        // dd($request);

        $validatedData = $request->validate([
            'lot_id' => 'required',
            'allottee_id' => 'required',
            'ownership_type' => 'required',
        ]);

        try {
            $ownership = new Ownership();
            $ownership->lot_id = $validatedData['lot_id'];
            $ownership->allottee_id = $validatedData['allottee_id'];
            $ownership->ownership_type = $validatedData['ownership_type'];
            $ownership->ownership_start_date = date("Y-m-d"); 
            $ownership->save();

            return redirect()->route('lots.index')->with('success', 'Pemilikan / Pentadbiran berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }
}
