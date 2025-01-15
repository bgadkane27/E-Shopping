import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShopOrdersDetailsView from "./order-details";

function ShopOrders() {
    const [openOrdersDetails, setOpenOrdersDetails] = useState(false)
    return (
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
                                <Dialog open={openOrdersDetails} onOpenChange={setOpenOrdersDetails}>
                                    <Button variant="outline"
                                        onClick={() => setOpenOrdersDetails(true)}>View Details</Button>
                                    <ShopOrdersDetailsView />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShopOrders;