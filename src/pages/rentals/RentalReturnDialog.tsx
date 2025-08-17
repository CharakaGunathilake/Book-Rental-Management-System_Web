"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export const RentalReturnDialog = () => {
  const [open, setOpen] = useState(false);
  const [rentalId, setRentalId] = useState<number | null>(null);
  const [returnDate, setReturnDate] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!rentalId || !returnDate) return;
    setLoading(true);
    try {
      // const price = await onCalculatePrice(rentalId, returnDate);
      // setCalculatedPrice(price);
    } catch (err) {
      console.error("Error calculating price:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!rentalId || !returnDate) return;
    setLoading(true);
    try {
      // await onReturn(rentalId, returnDate);
      setOpen(false);
      setRentalId(null);
      setReturnDate("");
      setCalculatedPrice(null);
    } catch (err) {
      console.error("Error processing return:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Return Rental
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Return Rental</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rental ID */}
          <div>
            <Label>Rental ID *</Label>
            <Input
              type="number"
              value={rentalId ?? ""}
              onChange={(e) => setRentalId(Number(e.target.value))}
            />
          </div>

          {/* Actual Return Date */}
          <div>
            <Label>Return Date *</Label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Price Calculation */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCalculate}
              disabled={!rentalId || !returnDate || loading}
            >
              {loading ? "Calculating..." : "Calculate Price"}
            </Button>
            {calculatedPrice !== null && (
              <span className="font-semibold text-green-600">
                Price: ${calculatedPrice}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleReturn}
            disabled={!rentalId || !returnDate || loading || !calculatedPrice}
          >
            Confirm Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
