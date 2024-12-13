import Icon from '@mdi/react'
import { mdiPencil, mdiCircleOutline, mdiImageArea, mdiImageAreaClose, mdiQrcode } from '@mdi/js';
import { Column, Row, Text, Button, Line, Switch } from "components";

const Branding = () => {

    return (
        <>
            <Column class="w-[100%] mt-6  mr-2">
                <Row>
                    <Text className="font-light text-black text-xl" >
                        Branding
                    </Text>
                </Row>

                <Line className=" bg-gray_700_33 h-[0.5px] mt-2 w-[100%] mb-3 " />

            </Column>


            <Column className="w-[100%]">
                <div class="">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        </thead>
                        <tbody>

                            <tr class="w-[100%] cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700 hover:bg-gray_101"
                            >
                                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[45%]">
                                    <Row className="items-center gap-2">
                                        <Icon path={mdiImageArea}
                                            size={0.9}
                                            color="#478fca"

                                        />
                                        <Text className="text-sm mt-1">Brand Logo</Text>
                                    </Row>
                                </th>
                                <td class="py-2 w-[20%] text-[13px] text-black ">

                                    <Row className="text-right">

                                        <Icon path={mdiCircleOutline}
                                            title="Bag"
                                            size={0.7}
                                            color="#667E99"

                                        />
                                        NOT SET

                                    </Row>

                                </td>
                                <td className="w-[35%] text-right ">
                                    <Button class=" ml-6 mt-2 bg-[#ffb752] hover:bg-[#eea236] ring-[#ffb752] ring-inset items-center h-6 w-[fit] px-2 ring-4"

                                    >
                                        <Row>
                                            <Icon path={mdiPencil}
                                                title="Bag"
                                                size={0.6}
                                                color="white"
                                                className="mt-1"
                                            />
                                            <Text
                                                className="pl-1 pt-1 text-xs font-light text-white cursor-pointer"
                                                variant="body4"
                                            >
                                                Modify
                                            </Text>
                                        </Row>
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Column>

            <Column className="w-[100%]">
                <div class="">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        </thead>
                        <tbody>

                            <tr class="w-[100%] cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700 hover:bg-gray_101"
                            >
                                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[45%]">
                                    <Row className="items-center gap-2">
                                        <Icon path={mdiImageAreaClose}
                                            size={0.9}
                                            color="#478fca"

                                        />
                                        <Text className="text-sm mt-1">Brand Icon</Text>
                                    </Row>
                                </th>
                                <td class="py-2 w-[20%] text-[13px] text-black ">

                                    <Row className="text-right">

                                        <Icon path={mdiCircleOutline}
                                            title="Bag"
                                            size={0.7}
                                            color="#667E99"

                                        />
                                        NOT SET

                                    </Row>

                                </td>
                                <td className="w-[35%] text-right ">
                                    <Button class=" ml-6 mt-2 bg-[#ffb752] hover:bg-[#eea236] ring-[#ffb752] ring-inset items-center h-6 w-[fit] px-2 ring-4"

                                    >
                                        <Row>
                                            <Icon path={mdiPencil}
                                                title="Bag"
                                                size={0.6}
                                                color="white"
                                                className="mt-1"
                                            />
                                            <Text
                                                className="pl-1 pt-1 text-xs font-light text-white cursor-pointer"
                                                variant="body4"
                                            >
                                                Modify
                                            </Text>
                                        </Row>
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Column>

            <Column className="w-[100%]">


                <div class="">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        </thead>
                        <tbody>

                            <tr class="w-[100%] cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700 hover:bg-gray_101"
                            >
                                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[45%]">
                                    <Row className="items-center gap-2">
                                        <Icon path={mdiQrcode}
                                            title="Bag"
                                            size={0.9}
                                            color="#478fca"

                                        />
                                        <Text className="text-sm mt-1">Ticket QR Code</Text>
                                    </Row>
                                </th>
                                <td class="py-2 w-[20%] text-[13px] text-black ">

                                    <Row className="text-right">

                                        <Icon path={mdiCircleOutline}
                                            title="Bag"
                                            size={0.7}
                                            color="#667E99"

                                        />
                                        DEFAULT

                                    </Row>

                                </td>
                                <td className="w-[35%] text-right ">
                                    <Button class=" ml-6 mt-2 bg-[#ffb752] hover:bg-[#eea236] ring-[#ffb752] ring-inset items-center h-6 w-[fit] px-2 ring-4"

                                    >
                                        <Row>
                                            <Icon path={mdiPencil}
                                                title="Bag"
                                                size={0.6}
                                                color="white"
                                                className="mt-1"
                                            />
                                            <Text
                                                className="pl-1 pt-1 text-xs font-light text-white cursor-pointer"
                                                variant="body4"
                                            >
                                                Modify
                                            </Text>
                                        </Row>
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </Column>
        </>
    )
}
export default Branding;