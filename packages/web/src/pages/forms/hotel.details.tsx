import { useState } from "react";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import StarsByAmount from "./components/starsByAmount";
import { Input } from "../components/ui/input";
import { PriceClass } from "../../api/entities";
import { RequiredValidInput } from "./components/requiredInput";

function HotelForm() {
  const [starValue, setStarValue] = useState("")
  const [priceClassValue, setPriceClass] = useState<PriceClass>(PriceClass.budget)
  const [numRooms, setNumRooms] = useState('');

  const changePriceClass = (priceClass: string) => {
    switch (priceClass) {
      case "budget": 
        setPriceClass(PriceClass.budget);
        break;
      case "low": 
        setPriceClass(PriceClass.low);
        break;
      case "medium":
        setPriceClass(PriceClass.medium);
        break;
      case "high": 
        setPriceClass(PriceClass.high);
        break;
      case "luxury":
        setPriceClass(PriceClass.luxury);
        break;
    }
  }
  
  return (
    <>
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Hotel Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stars">Stars</Label>
          <Select value={starValue} onValueChange={setStarValue}>
            <SelectTrigger id="stars" className="w-[200px]">
              <SelectValue placeholder="Amount of stars" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                <StarsByAmount amount={1} />
              </SelectItem>
              <SelectItem value="2">
              <StarsByAmount amount={2} />
              </SelectItem>
              <SelectItem value="3">
                <StarsByAmount amount={3} />
              </SelectItem>
              <SelectItem value="4">
                <StarsByAmount amount={4} />
              </SelectItem>
              <SelectItem value="5">
                <StarsByAmount amount={5} />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="numRooms" required>Num rooms</Label>
          <Input id="numrooms" placeholder="Number of rooms" value={numRooms} onChange={(e) => setNumRooms(e.target.value)} />
          <RequiredValidInput input={numRooms} type="number" />
        </div>
      </div>
      <div>
      <Label htmlFor="priceClass">Price Class</Label>
      <Select value={PriceClass[priceClassValue]} onValueChange={(e) => changePriceClass(e)}>
          <SelectTrigger id="priceClass" className="w-[200px]">
            <SelectValue placeholder="Select Price class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    </>
  )
}

export default HotelForm;