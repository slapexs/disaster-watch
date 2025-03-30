export interface IXml2Json {
	rss: IRss;
}

interface IRss {
	$: {
		version: string;
		geo: string;
		tmd: string;
	};
	channel: IEarthquakeChannel[];
}

export interface IEarthquakeChannel {
	title: string[];
	link: string[];
	description: string[];
	item: IChannelItem[];
}

export interface IChannelItem {
	title: string[];
	link: string[];
	"geo:lat": string[];
	"geo:long": string[];
	"tmd:depth": string[];
	"tmd:magnitude": string[];
	"tmd:time": string[];
	comment?: string[];
	pubDate: string[];
	description: string[];
}

