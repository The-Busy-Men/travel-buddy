import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsList } from "../components/ui/tabs"
import { Textarea } from "../components/ui/textarea"
import AddressForm from "./address.form"
import { useState } from "react"

export default function ObjectCreateForm() {
  const [tab, setTab] = useState('tab1')

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter property name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities</Label>
          <Textarea 
            id="amenities" 
            placeholder="List amenities (e.g., WiFi, Pool, Parking)"
            className="min-h-[100px]"
          />
        </div>
        
        <AddressForm />

        <Tabs defaultValue="tab1" className="mt-4 mb-4">
          <div className="border-b-2 rounded-none border-tertiary mb-2">
            <TabsList className="space-x-20 font-semibold">
              <TabsTrigger value="tab1" className={`${tab === 'tab1' ? 'text-primary' : ''}`} onClick={() => setTab('tab1')}>Tab 1</TabsTrigger>
              <TabsTrigger value="tab2" className={`${tab === 'tab2' ? 'text-primary' : ''}`} onClick={() => setTab('tab2')}>Tab 2</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
        
        {/* Space for future fields */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">Additional fields can be added here in the future.</p>
        </div>
        
        <Button type="submit" className="w-full bg-[#ff5a5f] hover:bg-[#ff5a5f]/90">Submit</Button>
      </form>
    </div>
  )
}