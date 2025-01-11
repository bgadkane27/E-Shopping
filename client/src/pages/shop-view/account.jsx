import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accImg from '../../assets/setting.webp'
import Orders from '@/components/shop-view/orders';
import Address from '@/components/shop-view/address';


function ShopAccount() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[250px] overflow-hidden">
                {
                    <img
                        src={accImg}
                        alt="Account Image"
                        className="w-full h-full rounded-md object-cover absolute top-0 left-0"
                    />
                }
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-6'>
                <div className='flex fex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs defaultValue='orders'>
                        <TabsList>
                            <TabsTrigger value="orders" className="text-md">Orders</TabsTrigger>
                            <TabsTrigger value="address" className="text-md">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <Orders />
                        </TabsContent>
                        <TabsContent value="address" className="w-full">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ShopAccount;