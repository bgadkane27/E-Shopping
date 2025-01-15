import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


function ShopOrders(){
    return(
        <Card>
            <CardHeader>
                <CardTitle className="ml-4">Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Number</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>                            
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>8769</TableCell>
                            <TableCell>27/12/2024</TableCell>
                            <TableCell>In process</TableCell>
                            <TableCell>₹ 120</TableCell>
                            <TableCell>
                                <Button>View Details</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShopOrders;