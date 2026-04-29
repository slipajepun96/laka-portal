<?php

namespace App\Imports;

use App\Models\Lot;
use Maatwebsite\Excel\Concerns\ToModel;

class LotsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Lot([
            'lot_num' => $row[0],
            'lot_file_num' => $row[1],
            'lot_description' => $row[2],
            'lot_area_size' => $row[3],
        ]);
    }
}
