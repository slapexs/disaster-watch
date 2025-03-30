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

	// const earthquakeData = {
	// 	title: ["แผ่นดินไหว"],
	// 	link: ["https://earthquake.tmd.go.th"],
	// 	description: ["กองเฝ้าระวังแผ่นดินไหว"],
	// 	item: [
	// 		{
	// 			title: ["ต.วังธง อ.เมืองแพร่ จ.แพร่ (Tambon Wang Thong, Amphoe MueangPhrae, Phrae)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13170"],
	// 			"geo:lat": ["18.202"],
	// 			"geo:long": ["100.126"],
	// 			"tmd:depth": ["4"],
	// 			"tmd:magnitude": ["2.1"],
	// 			"tmd:time": ["2025-03-30 11:21:56 UTC"],
	// 			comments: [""],
	// 			pubDate: ["Sun, 30 Mar 2025 18:47:52 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ต.วังธง อ.เมืองแพร่ จ.แพร่ <br>2025-03-30 18:21:56 น.<br>Lat. 18.202 , Long. 100.126<br>ขนาด 2.1 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ต.วังธง อ.เมืองแพร่ จ.แพร่ (Tambon Wang Thong, Amphoe MueangPhrae, Phrae)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13171"],
	// 			"geo:lat": ["18.175"],
	// 			"geo:long": ["100.135"],
	// 			"tmd:depth": ["2"],
	// 			"tmd:magnitude": ["2.0"],
	// 			"tmd:time": ["2025-03-30 11:21:56 UTC"],
	// 			comments: [""],
	// 			pubDate: ["Sun, 30 Mar 2025 19:09:07 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ต.วังธง อ.เมืองแพร่ จ.แพร่ <br>2025-03-30 18:21:56 น.<br>Lat. 18.175 , Long. 100.135<br>ขนาด 2.0 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ต.วังธง อ.เมืองแพร่ จ.แพร่ (Tambon Wang Thong, Amphoe MueangPhrae, Phrae)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13169"],
	// 			"geo:lat": ["18.200"],
	// 			"geo:long": ["100.146"],
	// 			"tmd:depth": ["4"],
	// 			"tmd:magnitude": ["2.8"],
	// 			"tmd:time": ["2025-03-30 11:19:46 UTC"],
	// 			comments: [""],
	// 			pubDate: ["Sun, 30 Mar 2025 18:26:13 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ต.วังธง อ.เมืองแพร่ จ.แพร่ <br>2025-03-30 18:19:46 น.<br>Lat. 18.200 , Long. 100.146<br>ขนาด 2.8 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13168"],
	// 			"geo:lat": ["20.012"],
	// 			"geo:long": ["96.488"],
	// 			"tmd:depth": ["10"],
	// 			"tmd:magnitude": ["4.0"],
	// 			"tmd:time": ["2025-03-30 11:06:27 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงเหนือของ อ.เมือง จ.แม่ฮ่องสอน ประมาณ 174 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 18:14:49 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 18:06:27 น.<br>Lat. 20.012 , Long. 96.488<br>ขนาด 4.0 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13167"],
	// 			"geo:lat": ["20.232"],
	// 			"geo:long": ["98.418"],
	// 			"tmd:depth": ["5"],
	// 			"tmd:magnitude": ["3.1"],
	// 			"tmd:time": ["2025-03-30 10:32:44 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงเหนือของ อ.เวียงแหง จ.เชียงใหม่ ประมาณ 78 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 17:37:33 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 17:32:44 น.<br>Lat. 20.232 , Long. 98.418<br>ขนาด 3.1 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13166"],
	// 			"geo:lat": ["19.924"],
	// 			"geo:long": ["96.361"],
	// 			"tmd:depth": ["10"],
	// 			"tmd:magnitude": ["3.1"],
	// 			"tmd:time": ["2025-03-30 10:11:03 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงเหนือของ อ.เมือง จ.แม่ฮ่องสอน ประมาณ 182 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 17:16:36 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 17:11:03 น.<br>Lat. 19.924 , Long. 96.361<br>ขนาด 3.1 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13165"],
	// 			"geo:lat": ["21.952"],
	// 			"geo:long": ["96.623"],
	// 			"tmd:depth": ["10"],
	// 			"tmd:magnitude": ["3.5"],
	// 			"tmd:time": ["2025-03-30 10:00:25 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงเหนือของ อ.ปางมะผ้า จ.แม่ฮ่องสอน ประมาณ 319 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 17:09:37 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 17:00:25 น.<br>Lat. 21.952 , Long. 96.623<br>ขนาด 3.5 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ต.แม่นาเติง อ.ปาย จ.แม่ฮ่องสอน (Tambon Mae Na Toeng, Amphoe Pai, MaeHongSon)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13164"],
	// 			"geo:lat": ["19.580"],
	// 			"geo:long": ["98.423"],
	// 			"tmd:depth": ["5"],
	// 			"tmd:magnitude": ["1.9"],
	// 			"tmd:time": ["2025-03-30 09:42:53 UTC"],
	// 			comments: [""],
	// 			pubDate: ["Sun, 30 Mar 2025 16:47:48 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ต.แม่นาเติง อ.ปาย จ.แม่ฮ่องสอน <br>2025-03-30 16:42:53 น.<br>Lat. 19.580 , Long. 98.423<br>ขนาด 1.9 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13162"],
	// 			"geo:lat": ["19.177"],
	// 			"geo:long": ["96.621"],
	// 			"tmd:depth": ["10"],
	// 			"tmd:magnitude": ["3.4"],
	// 			"tmd:time": ["2025-03-30 09:25:31 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงใต้ของ อ.เมือง จ.แม่ฮ่องสอน ประมาณ 142 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 16:31:29 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 16:25:31 น.<br>Lat. 19.177 , Long. 96.621<br>ขนาด 3.4 <br><br> ",
	// 			],
	// 		},
	// 		{
	// 			title: ["ประเทศเมียนมา (Myanmar)"],
	// 			link: ["https://earthquake.tmd.go.th/inside-info.html?earthquake=13163"],
	// 			"geo:lat": ["19.730"],
	// 			"geo:long": ["97.953"],
	// 			"tmd:depth": ["5"],
	// 			"tmd:magnitude": ["2.1"],
	// 			"tmd:time": ["2025-03-30 09:00:59 UTC"],
	// 			comments: ["ทางทิศตะวันตกเฉียงเหนือของ อ.ปางมะผ้า จ.แม่ฮ่องสอน ประมาณ 38 กม. "],
	// 			pubDate: ["Sun, 30 Mar 2025 16:32:25 +0700"],
	// 			description: [
	// 				" แผ่นดินไหว ประเทศเมียนมา <br>2025-03-30 16:00:59 น.<br>Lat. 19.730 , Long. 97.953<br>ขนาด 2.1 <br><br> ",
	// 			],
	// 		},
	// 	],
	// };

	const getLevel = (magnitude: number): string => {
		if (magnitude <= 2.9) return "bg-yellow-400 text-black";
		if (magnitude <= 3.9) return "bg-yellow-500 text-white";
		if (magnitude <= 4.9) return "bg-orange-400 text-white";
		if (magnitude <= 5.9) return "bg-orange-500 text-white";
		if (magnitude <= 6.9) return "bg-red-600 text-white";
		return "bg-red-700 text-white";
	};

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
										เวลา: {dayjs(item["tmd:time"][0]).format("HH:mm:ss - DD/MM/YYYY")}
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

