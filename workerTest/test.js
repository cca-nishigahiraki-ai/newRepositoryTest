/*
<!DOCTYPE html>
<html lang="jp">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="stylesheet" href="../reset.css">
		<title>workerTest</title>
		<style>
			@charset "utf-8";
		</style>
	</head>
	<body>
		<head>
		</head>
		<main>
		</main>
		<footer>
		</footer>
		<script>
*/
		'use strict';
		//
		const checkList = [];
		const resultList = [];
		let endIs =false;
		//
		onmessage = function(evt) {
			console.log(`message received : ${evt.data.mess} @ test.js`);
			//
			const status = evt.data.mess;
			//
			if(status == 'main') {
				// チェックタイマー
				const timerDuration = 1000;
				//setTimeout(testTimer, timerDuration);
				//
				function testTimer(){
					this.dispatchEvent(new Event('timerCheck'));
					if(!endIs) {
						setTimeout(testTimer, timerDuration);
					}
				}
				this.addEventListener('timerCheck',
					function(evt){
						if(!endIs) {
						//console.clear();
						console.log('timerChecked');
						//console.log(resultList);
						}
					}
				);

				//
				const num = evt.data.num;
				//
				let flg = true;
				let funcTimerID //= setTimeout(checkFunc, 1);
				let current = 1;
				let counter = 1;
				let parentIs = true;
				let childIs = true;
				//
				function checkFunc() {
					//console.log(`checFunc:::${current}-${counter}`);
					if(parentIs && childIs) { 
						counter = 1;
						childIs = false;
					}
					if(parentIs){
						current++;
						parentIs = false;
					}
					if(!childIs) {
						counter++;
						if(counter>=current) {
							parentIs = childIs = true;
							resultList.push(current);
						}
					}
					if( current%counter == 0 ) {
						parentIs = childIs = true;
					}
					//
					if(current <= num) {
						funcTimerID = setTimeout(checkFunc, 1);
					}
					else {
						endIs = true;
						postMessage({status:'result', list:resultList});
					}
				}
				//
				//
				let nowDate = new Date();
				let currentDate;
				counter = 0;
				// checkListの生成
				console.log('test');
				let checkList3 = new Array(10000000).fill(true);
				console.log('test2');
				let checkList4 = new Array(10000000).fill(true);
				console.log('test3');
				let testList = [];
				for(let i=0;i<100;i++){
				testList.push( new Array(1000000).fill(true) );
				}
				console.log('check',testList);
				/*
				while( 10000 * counter <= num ) {
					//console.log(10000 * counter);
					checkList[counter] = [];
					for(let i=0; i<num-(counter*10000); i++) {
						checkList[counter][i] = true;
					}
					counter++;
				}
				//console.log(checkList);
				//
				for(let i=2; i<=num; i++) {
					for(let j=2; j<num; j++) {
						//console.log(Math.floor((i*j)/10000),(i*j)%10000);
						if(i*j <= num) {
							if(checkList[Math.floor((i*j)/10000)][(i*j)%10000]) {
								checkList[Math.floor((i*j)/10000)][(i*j)%10000] = false;
							}
						}
						else {
							break;
						}
					}
				}
				//
				const resultList2 = [];
				for(let i=0; i<checkList.length; i++) {
					for(let j=0; j<10000; j++) {
						if( checkList[i][j] ) {
							if(i*10000+j > 1) {
								resultList2.push(i*10000+j);
							}
						}
					}
				}
				/*
				for(let i=2; i<num; i++) {
					flg = true;
					for(let j=2; j<i; j++) {
						//
						currentDate = new Date();
						if( currentDate.getTime() - nowDate.getTime() >= 1000) {
							counter++;
							nowDate = new Date();
							console.log(counter+'::::');
							console.log(checkList);
						}
						//
						if( i%j == 0 ) {
							flg = false;
							break;
						}
					}
					if( flg ) {
						checkList.push(i);
					}
				}
				endIs = true;
				currentDate = new Date();
				console.log((currentDate.getTime() - nowDate.getTime())/1000 + 's ::::');
				*/
				postMessage({status:'result', list:resultList2});
				//
			}
			else if(status == 'check') {
				postMessage({status:'check', list:checkList});
			}
		};
/*
		</script>
	</body>
</html>
*/