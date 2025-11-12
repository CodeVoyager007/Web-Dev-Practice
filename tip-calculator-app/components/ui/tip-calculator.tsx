"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent, useEffect } from "react";

// Import custom UI components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TipCalculatorComponent() {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBillAmount(parseFloat(e.target.value));
  };

  const handleTipPercentageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTipPercentage(parseFloat(e.target.value));
  };

  const calculateTip = (): void => {
    if (billAmount !== null && tipPercentage !== null) {
      const tip = billAmount * (tipPercentage / 100);
      setTipAmount(tip);
      setTotalAmount(billAmount + tip);
    }
  };

  const lightTheme = {
    background: "#CBC9AD",
    cardBg: "#CBD0B9",
    textColor: "#514B23",
    inputBg: "#BDDBD0",
    buttonBg: "#656839",
  };

  const darkTheme = {
    background: "#000000", // black
    cardBg: "#002D72", // blue
    textColor: "#F5F5DC", // golden white
    inputBg: "#1A202C", // dark blue
    buttonBg: "#800000", // maroon
    headingColor: "#800000", // maroon for heading
    accentColor: "#004526", // dark green
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundColor: darkMode ? darkTheme.background : lightTheme.background,
        color: darkMode ? darkTheme.textColor : lightTheme.textColor,
      }}
    >
      <Card
        className="w-full max-w-md p-6 shadow-lg rounded-lg"
        style={{
          backgroundColor: darkMode ? darkTheme.cardBg : lightTheme.cardBg,
          fontFamily: "'Dancing Script', cursive",
          color: darkMode ? darkTheme.textColor : lightTheme.textColor,
        }}
      >
        <CardHeader>
          <CardTitle 
            className="text-3xl font-bold italic text-center" 
            style={{ color: darkMode ? darkTheme.headingColor : lightTheme.textColor }}
          >
            𝓣𝓲𝓹 𝓒𝓪𝓵𝓬𝓾𝓵𝓪𝓽𝓸𝓻
          </CardTitle>
          <CardDescription>
            Enter the bill amount and tip percentage to calculate the tip and total.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="bill-amount">Bill Amount</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount !== null ? billAmount : ""}
              onChange={handleBillAmountChange}
              style={{
                backgroundColor: darkMode ? darkTheme.inputBg : lightTheme.inputBg,
                color: darkMode ? darkTheme.textColor : lightTheme.textColor,
              }}
              className="border-2 p-2"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tip-percentage">Tip Percentage</Label>
            <Input
              id="tip-percentage"
              type="number"
              placeholder="Enter tip percentage"
              value={tipPercentage !== null ? tipPercentage : ""}
              onChange={handleTipPercentageChange}
              style={{
                backgroundColor: darkMode ? darkTheme.inputBg : lightTheme.inputBg,
                color: darkMode ? darkTheme.textColor : lightTheme.textColor,
              }}
              className="border-2 p-2"
            />
          </div>
          <Button
            onClick={calculateTip}
            className="text-white font-bold py-2 px-4 rounded"
            style={{
              backgroundColor: darkMode ? darkTheme.buttonBg : lightTheme.buttonBg,
            }}
          >
            Calculate
          </Button>
        </CardContent>
        <CardFooter className="grid gap-2">
          <div className="flex items-center justify-between">
            <span>Tip Amount:</span>
            <span className="font-bold">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Amount:</span>
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </CardFooter>
        <div className="mt-4 text-right absolute bottom-4 right-4">
          <p>
            Made with <span style={{ color: "#800000" }}>♥</span> by Ayesha Mughal
          </p>
        </div>
      </Card>
      <Button
        onClick={toggleDarkMode}
        className="mt-4 text-white font-bold py-2 px-4 rounded"
        style={{
          backgroundColor: darkMode ? darkTheme.buttonBg : lightTheme.buttonBg,
        }}
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </Button>
    </div>
  );
}
