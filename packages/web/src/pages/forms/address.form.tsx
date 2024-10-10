import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

export default function AddressForm() {

  return (
    <>
      
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" placeholder="Enter street address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Enter postal code" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Enter country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" placeholder="Apartment, suite, etc." />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address Type</Label>
              <RadioGroup defaultValue="home">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work">Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shipping" id="shipping" />
                    <Label htmlFor="shipping">Shipping</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          
    </>
  )
}