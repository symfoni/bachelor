import fs from 'fs';
import fetch from 'cross-fetch';

/**
 * downloadPDF is a function downloads a pdf from the internet through a URL
 * @param url is the URL you want to download from
 * @param filename is by default set to tempContract.pdf, but can be set manually if another name or location for file is prefered
 */
export function downloadPDF(url: string, filename = 'tempContract.pdf') {
	if(url.endsWith('.pdf')) {
		fetch(url).then((response) => response.arrayBuffer()).then(data => {

			const fileData = new DataView(data);
			fs.writeFile(filename, fileData, (err) => {
				if (err)
					console.log(err);
			});

		});} else {
		console.log('url must end with .pdf');
	}
} 


downloadPDF('https://github.com/symfoni/bachelor/raw/dev/test/test%20data/test-arbeidskontrakt-00.pdf');