import { IChannelItem, IEarthquakeChannel, IXml2Json } from "@/types/earthquake";
import axios, { isAxiosError } from "axios";
import { Suspense } from "react";
import { parseStringPromise } from "xml2js";
import PageTitle from "@/components/PageTitle";
import dayjs from "dayjs";

const getEarthQuake = async () => {
	try {
		const apiUrl = process.env.EARTHQUAKE_TMD_RSS ?? "";
		const { data } = await axios.get(apiUrl, { responseType: "text" });
		const convertedData: IXml2Json = await parseStringPromise(data);

		const responseData: IEarthquakeChannel = convertedData.rss.channel[0];
		return responseData;
	} catch (error) {
		if (isAxiosError(error)) {
			console.error(error.message);
		} else {
			console.error(error);
		}
		return null;
	}
};

export default async function Page() {
	const earthquakeData = await getEarthQuake();

	return (
		<>
			<PageTitle title="เหตุการณ์แผ่นดินไหว" description={`ข้อมูลจาก: ${earthquakeData?.description[0]}`} />

			<Suspense>
				<ul className="list bg-base-100 rounded-box shadow-md gap-5 mt-5 container mx-auto">
					{earthquakeData?.item.map((item: IChannelItem, index: number) => (
						<li className="list-row" key={index}>
							<div>
								<div
									className={`size-12 text-xl rounded-box flex justify-center items-center ${
										parseFloat(item["tmd:magnitude"][0]) <= 2.9
											? "bg-yellow-300 text-black"
											: parseFloat(item["tmd:magnitude"][0]) <= 3.9
											? "bg-yellow-500 text-white"
											: parseFloat(item["tmd:magnitude"][0]) <= 4.9
											? "bg-orange-400 text-white"
											: parseFloat(item["tmd:magnitude"][0]) <= 5.9
											? "bg-orange-500 text-white"
											: parseFloat(item["tmd:magnitude"][0]) <= 6.9
											? "bg-red-600 text-white"
											: "bg-red-700 text-white"
									}`}
								>
									{item["tmd:magnitude"][0]}
								</div>
							</div>
							<div>
								<div className="font-semibold">{item.title}</div>
								<div className="text-xs font-semibold opacity-60  items-center mt-2">
									<p className="list-col-wrap text-xs">
										เวลา: {dayjs(item["tmd:time"][0]).add(7, "h").format("HH:mm:ss - DD/MM/YYYY")}
									</p>
								</div>
								<div>
									<p className="list-col-wrap text-xs">ลึก: {item["tmd:depth"][0]} กม.</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</Suspense>
		</>
	);
}

