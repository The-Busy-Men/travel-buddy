/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import AddressForm from "./address.form"
import HotelForm from "./hotel.details"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useState } from "react"
import { PriceClass } from "../../api/entities"
import { RequiredValidInput } from "./components/requiredInput"
import { FaPlus } from "react-icons/fa6";
import { Card, CardContent } from "../components/ui/card"
import { isValidNumber, isValidString } from "./validation/validation"
import AirbnbForm from "./airbnb.details"
import { getUserId } from "../utils/getUserId"
import { airbnbDataDict, hotelDataDict, useApproval } from "./hooks/useApproval"
import { useNavigate } from 'react-router-dom';
import { useAlert } from "../../api/providers/alertContext"
import { Alert } from "../components/ui/alert"

export default function ObjectCreateForm() {
  const approval = useApproval()
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  const [type, setType] = useState('hotel')
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState('');

  // Hotel Values
  const [starValue, setStarValue] = useState('')
  const [priceClassValue, setPriceClass] = useState<PriceClass>(PriceClass.budget)
  const [numRooms, setNumRooms] = useState('');

  // Airbnb Values
  const [hostName, setHostName] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [isShared, setIsShared] = useState(false);

  const [displayAddress, setDisplayAddress] = useState(false);

  const getData = () => {
    switch (type) {
      case 'hotel': {
        const data: hotelDataDict = {
          name: name,
          description: description,
          amenities: amenities,
          stars: Number(starValue),
          numRooms: Number(numRooms),
          priceClass: priceClassValue,
        }
        return data;
      }
      case 'airbnb': {
        const data: airbnbDataDict = {
          name: name,
          description: description,
          amenities: amenities,
          hostName: hostName,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          isShared: isShared,
        }
        return data;
      }

      default: {
        return {} as hotelDataDict;
      }
    }
  }
  const createApprovalRequest = () => {
    const data = getData();
    const userId = getUserId()

    const submitBody = {
      type: type,
      data: data,
      submittedBy: userId
    }

    approval.createApprovalRequest.mutate({body: submitBody})
    showAlert('Submission successful', 'success');
    navigate('/')
  }

  const canSubmit = (): boolean => {
    switch (type) {
      case "hotel": {
        if (isValidString(name) && isValidNumber(Number(numRooms))) return true;
        return false;
      }
      case "airbnb": if (isValidString(name) && isValidString(hostName) && isValidNumber(Number(bedrooms)) && isValidNumber(Number(bathrooms))) return true; return false;
      default: return false;
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-4">
      <Alert />
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" placeholder="Enter property name" value={name} onChange={(e) => setName(e.target.value)} />
          <RequiredValidInput input={name} type='string' />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Description of the place"
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities</Label>
          <Textarea 
            id="amenities" 
            placeholder="List amenities (e.g., WiFi, Pool, Parking)"
            className="min-h-[100px]"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
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
          ? <HotelForm starValue={starValue} setStarValue={setStarValue} priceClassValue={priceClassValue} setPriceClass={setPriceClass} numRooms={numRooms} setNumRooms={setNumRooms} /> 
          : <AirbnbForm hostName={hostName} setHostName={setHostName} bedrooms={bedrooms} setBedrooms={setBedrooms} bathrooms={bathrooms} setBathrooms={setBathrooms} isShared={isShared} setIsShared={setIsShared} />}

        <div className="border-t border-gray-200 pt-4"></div>

        <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-row items-center">
            <Button disabled type="button" className="bg-tertiary hover:bg-tertiary" onClick={() => displayAddress ? setDisplayAddress(false) : setDisplayAddress(true)}><FaPlus /></Button>
            <span className="ml-4 text-tertiary font-medium">Add an Address</span>
          </div>
          {displayAddress && <AddressForm />}
        </CardContent>
        </Card>      
        
        <Button disabled={!canSubmit()} type="button" className="w-full bg-[#ff5a5f] hover:bg-[#ff5a5f]/90" onClick={() => createApprovalRequest()}>Submit</Button>
      </form>
    </div>
  )
}