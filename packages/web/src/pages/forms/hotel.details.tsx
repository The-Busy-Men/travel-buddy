import { useState } from "react";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import StarsByAmount from "./components/starsByAmount";
import { Input } from "../components/ui/input";

function HotelForm() {
  const [value, setValue] = useState("")

  console.log(value)
  return (
    <>
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Hotel Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stars">Stars</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger id="stars" className="w-[200px]">
              <SelectValue placeholder="Select the amount of stars" />
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
          <Label htmlFor="numRooms">Num rooms</Label>
          <Input id="numrooms" placeholder="Number of rooms" />
        </div>
      </div>
    </div>
    </>
  )
}

export default HotelForm;