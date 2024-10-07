import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import AddressForm from "./address.form"
import HotelForm from "./hotel.details"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useState } from "react"

export default function ObjectCreateForm() {
  const [type, setType] = useState('hotel')

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" placeholder="Enter property name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Description of the place"
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities</Label>
          <Textarea 
            id="amenities" 
            placeholder="List amenities (e.g., WiFi, Pool, Parking)"
            className="min-h-[100px]"
          />
        </div>

        <div className="mt-2">
          <Label htmlFor="type">Type</Label>
          <RadioGroup defaultValue={type} id="type">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hotel" id="hotel" onClick={() => setType('hotel')} />
                <Label htmlFor="hotel">Hotel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="airbnb" id="airbnb" onClick={() => setType('airbnb')} />
                <Label htmlFor="airbnb">AirBnb</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {type === 'hotel' 
          ? <HotelForm /> 
          : undefined}
        
        <AddressForm />
        
        {/* Space for future fields */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">Additional fields can be added here in the future.</p>
        </div>
        
        <Button type="submit" className="w-full bg-[#ff5a5f] hover:bg-[#ff5a5f]/90">Submit</Button>
      </form>
    </div>
  )
}