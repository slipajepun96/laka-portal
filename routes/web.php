<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LotController;
use App\Http\Controllers\AllotteeController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AllotteeAuth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/lots', [LotController::class, 'lotIndex'])->name('lots.index');
    Route::post('/lots/add', [LotController::class, 'lotAdd'])->name('lots.add');
    Route::post('/lots/edit', [LotController::class, 'lotEdit'])->name('lots.edit');
    Route::post('/lots/file-import', [LotController::class, 'lotImportExcel'])->name('lots.import');
    Route::post('/lots/add-allottee', [LotController::class, 'lotAddAllottee'])->name('lots.add-allottee');

    Route::get('/allottee', [AllotteeController::class, 'allotteeIndex'])->name('allottee.index');
    Route::post('/allottee/add', [AllotteeController::class, 'allotteeAdd'])->name('allottee.add');
    Route::post('/allottee/generate-default-password', [AllotteeController::class, 'allotteeGenerateDefaultPassword'])->name('allottee.generate_default_password');

    Route::get('/transaction', [TransactionController::class, 'transactionIndex'])->name('transaction.index');
    Route::get('/transaction/add-bulk', [TransactionController::class, 'transactionViewAddBulk'])->name('transaction.add-bulk');
    Route::post('/transaction/save-bulk', [TransactionController::class, 'transactionSaveBulk'])->name('transaction.save-bulk');
    Route::post('/transaction/delete', [TransactionController::class, 'transactionDelete'])->name('transaction.delete');
    Route::get('/transaction/view/{transaction}', [TransactionController::class, 'transactionView'])->name('transaction.view');
});


//allottee auth
Route::post('/allottee/login', [AllotteeController::class, 'allotteeLogin'])->name('allottee.login');
Route::post('/allottee/logout', [AllotteeController::class, 'allotteeLogout'])->name('allottee.logout');

Route::middleware(AllotteeAuth::class)->group(function () {
    Route::get('/u', [AllotteeController::class, 'allotteeMain'])->name('allottee.main');
});




require __DIR__.'/auth.php';
