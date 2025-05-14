<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lot;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class LotController extends Controller
{
    public function lotIndex(Request $request): Response
    {
        $lots = Lot::orderBy('lot_num')->get()->toArray();
        // dd($lots);
        return Inertia::render('Administrator/Lots/LotsIndex',[
            'lots' => $lots
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
}
