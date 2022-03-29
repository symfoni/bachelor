import fs from 'fs';
import fetch from 'cross-fetch';

const FILE_STORE_PATH = './src/utils/tempContract.pdf';
/**
 * downloadPDF is a function that downloads a pdf from the internet through a URL
 * @param url is the URL you want to download from and the URL must end with .pdf
 * @param filename is by default set to tempContract.pdf and stored in the utils-folder. another name can be set if prefered. The new filename should have the .pdf extension
 */
export function downloadPDF(url: string) {
	if(url.endsWith('.pdf')) {
		fetch(url).then((response) => response.arrayBuffer()).then(data => {

			const fileData = new DataView(data);
			fs.writeFile(FILE_STORE_PATH, fileData, (err) => {
				if (err)
					console.log(err);
			});

		});} else {
		console.log('url must end with .pdf');
	}
} 


downloadPDF('https://github.com/symfoni/bachelor/raw/dev/test/test%20data/test-arbeidskontrakt-00.pdf');