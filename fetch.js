const dat = fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return(data.dataseries)
        })
        const body = document.getElementById("body")
        const table_start = '<table class="body">'
        const table_end = "</table>"
        const thead_start = "<thaed>"
        const thead_end = "</thaed>"
        const tbody_start = "<tbody>"
        const tbody_end = "</tbody>"
        const th_start = "<th>"
        const th_end = "</th>"
        const tr_start = "<tr>"
        const tr_end = "</tr>"
        const td_start = "<td>"
        const td_end = "</td>"

        async function makeTable(dat) {
            let data = await dat
            // console.log('dataseries: ', data);
            const data_nums = Object.keys(data)
            const data_keys = Object.keys(data[0])
            const data_sub_keys = Object.keys(data[0].wind10m)
            // console.log('data_keys[0]: ', data_keys[0]);
            // console.log('data_keys: ', data_keys);
            // console.log('data_sub_key: ', data_sub_keys);
            let content = ''
            let column = []
            let key = []
            let subColumn = []
            let nums_list = []
            let main = table_start + thead_start

            for (let i in data_nums){
                if(i == 0){
                    main += th_start + "Fetch" + th_end
                }else{
                main += th_start + data_nums[i] + th_end
                }
            }
            main += th_start + data_nums.length + th_end
     
            for (let j in data_keys){
                column[0] = data_keys[j]
                main += tr_start
                for (let i = 1; i <= data.length; i++){
                    if(j == 6){
                        column[i] = 
                        `${data_sub_keys[0]}=${data[i - 1][data_keys[j]][data_sub_keys[0]]}\n${data_sub_keys[1]}=${data[i - 1][data_keys[j]][data_sub_keys[1]]}`
                    }
                    else{
                        column[i] = data[i - 1][data_keys[j]]
                    }
                        if (i == 1){
                            main += th_start + column[i - 1] + td_end
                        }
                        else{
                            main += td_start + column[i - 1] + td_end
                            if(i == data.length){
                                main += td_start + column[i] + td_end
                            }
                        }
                }
                // console.log(`column[${j}]: `, column);
            }
            main += thead_end + table_end
            body.innerHTML = `${main}`
            // console.log(`table: ${main}`);
        }
        
makeTable(dat);