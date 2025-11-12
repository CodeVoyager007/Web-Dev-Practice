"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

// Default export of the BmiCalculator function
export default function BmiCalculator() {
  // State hooks for managing height, weight, BMI result, error message, and theme
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Handler for updating height state on input change
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  // Handler for updating weight state on input change
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate the BMI and determine the category
  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight."); // Alert if either input is empty
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number."); // Alert if height is not positive
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number."); // Alert if weight is not positive
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters); // Calculate the BMI value
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category }); // Set the BMI result state
    setError(""); // Clear any previous error message
  };

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDarkTheme ? 'bg-[#090a0e]' : 'bg-[#f7edd0]'}`}>
      <Card
        className="w-full max-w-md mx-auto"
        style={{
          backgroundColor: isDarkTheme ? '#090a0e' : '#f7edd0',
          border: isDarkTheme ? '2px solid #ffffff' : '2px solid #760504', // White border for dark theme, maroon border for light theme
          borderRadius: '12px',
        }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold" style={{ fontFamily: 'FancyScript Bold Italic', color: isDarkTheme ? '#fbdc6a' : '#970c10' }}>
            𝓑𝓜𝓘 𝓒𝓪𝓵𝓬𝓾𝓵𝓪𝓽𝓸𝓻
          </CardTitle>
          <CardDescription style={{ color: isDarkTheme ? '#b12b24' : '#947360' }}>
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="height" style={{ color: isDarkTheme ? '#fbdc6a' : '#970c10' }}>Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
              style={{
                borderColor: isDarkTheme ? '#b12b24' : '#947360',
                color: isDarkTheme ? '#fbdc6a' : '#000', // Set input text color
                backgroundColor: isDarkTheme ? '#090a0e' : '#fff', // Input background
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight" style={{ color: isDarkTheme ? '#fbdc6a' : '#970c10' }}>Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              style={{
                borderColor: isDarkTheme ? '#b12b24' : '#947360',
                color: isDarkTheme ? '#fbdc6a' : '#000', // Set input text color
                backgroundColor: isDarkTheme ? '#090a0e' : '#fff', // Input background
              }}
            />
          </div>
          <Button 
            onClick={calculateBmi} 
            className={`text-white ${isDarkTheme ? 'bg-[#b12b24]' : 'bg-[#970c10]'}`}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '8px' }}
          >
            Calculate
          </Button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {result && (
            <div className="grid gap-2">
              <div className="text-center text-2xl font-bold" style={{ color: isDarkTheme ? '#fbdc6a' : '#970c10' }}>
                {result.bmi}
              </div>
              <div className="text-center text-muted-foreground" style={{ color: isDarkTheme ? '#b12b24' : '#947360' }}>
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Button 
        onClick={toggleTheme} 
        className="mt-4 text-white"
        style={{ backgroundColor: isDarkTheme ? '#b12b24' : '#970c10', padding: '0.5rem 1rem', borderRadius: '8px' }}
      >
        Toggle Dark Mode
      </Button>
      <div className="absolute bottom-4 right-4 text-[#b12b24]" style={{ fontFamily: 'FancyScript Bold Italic' }}>
        Made with ♥ by Ayesha Mughal
      </div>
    </div>
  );
}
