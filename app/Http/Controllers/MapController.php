<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pin;

class MapController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard');
    }
    
    /**
     * Display the map with pins
     */
    public function showMap()
    {
        // Get all pins to display on map
        $pins = Pin::all();
        
        return Inertia::render('Map', [
            'pins' => $pins
        ]);
    }
    
    /**
     * Save a new pin to the database
     */
    public function postPin(Request $request)
    {
        // Validate request data
        $request->validate([
            'id_kk' => 'required|integer',
            'alamat' => 'required|string',
            'koordinat' => 'required'
        ]);
        
        // Create new pin
        $pin = new Pin();
        $pin->id_kk = $request->id_kk;
        $pin->alamat = $request->alamat;
        $pin->koordinat = json_encode($request->koordinat);
        $pin->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Pin created successfully',
            'data' => $pin
        ]);
    }
    
    /**
     * Update an existing pin
     */
    public function updatePin(Request $request)
    {
        // Validate request data
        $request->validate([
            'id_pin' => 'required|integer',
            'alamat' => 'sometimes|string',
            'koordinat' => 'sometimes'
        ]);
        
        // Find the pin
        $pin = Pin::findOrFail($request->id_pin);
        
        // Update pin data
        if ($request->has('alamat')) {
            $pin->alamat = $request->alamat;
        }
        
        if ($request->has('koordinat')) {
            $pin->koordinat = json_encode($request->koordinat);
        }
        
        $pin->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Pin updated successfully',
            'data' => $pin
        ]);
    }
    
    /**
     * Delete a pin
     */
    public function deletePin(Request $request)
    {
        // Validate request data
        $request->validate([
            'id_pin' => 'required|integer'
        ]);
        
        // Find and delete the pin
        $pin = Pin::findOrFail($request->id_pin);
        $pin->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Pin deleted successfully'
        ]);
    }
}
