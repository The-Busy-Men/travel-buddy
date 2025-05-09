import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { RequiredValidInput } from "./components/requiredInput";

interface AirbnbValues {
  hostName: string;
  setHostName: (value: string) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  isShared: boolean;
  setIsShared: (value: boolean) => void;
}

function AirbnbForm({hostName, setHostName, bedrooms, setBedrooms, bathrooms, setBathrooms, isShared, setIsShared}: AirbnbValues) {
  return (
    <>
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">AirBnb Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="host" required>Host Name</Label>
          <Input id="host" placeholder="Your name" value={hostName} onChange={(e) => setHostName(e.target.value)} />
          <RequiredValidInput input={hostName} type="string" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shared" required>Shared</Label>
          <Select value={String(isShared)} onValueChange={(e) => setIsShared(e === "true")}>
            <SelectTrigger id="shared">
              <SelectValue placeholder="Select Price class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Shared</SelectItem>
              <SelectItem value="false">Not shared</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bathrooms" required>Number if Bathrooms</Label>
          <Input id="bathrooms" placeholder="Number of bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
          <RequiredValidInput input={bathrooms} type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms" required>Number of Bedrooms</Label>
          <Input id="bedrooms" placeholder="Number of bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
          <RequiredValidInput input={bedrooms} type="number" />
        </div>
      </div>
    </div>
    </>
  )
}

export default AirbnbForm;