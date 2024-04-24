<script lang="ts">

type ResData = [string, number][]

let resultArray:ResData

const getDataRate = async():Promise<ResData|void>=>{
  try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD')
      let objFetch = await res.json()
      let result:ResData = await Object.entries(objFetch.rates)
      resultArray = result
  } catch (error) {
    console.log(error)
  }
}
getDataRate()

let selectedInput:number
let selectedOutput:number

let ratesInput:number 
let ratesOutput:number

const setRatesOutput = (value:number)=>{
 ratesOutput = value/selectedInput * selectedOutput
}

const setRatesInput = (value:number)=>{
 ratesInput = value/selectedOutput *selectedInput
}
</script>

<main>
 <div class="input">
  <div class="input_btn">
  {#await getDataRate() then _ } 
    <select bind:value={selectedInput} on:change={()=>setRatesOutput(ratesInput)}>
     {#each resultArray as el}
			<option value={el[1]}>
				{el[0]}
			</option>
		 {/each}
    </select>
  {/await}
  </div>
  <div>
    <input placeholder="enter amount" type="number" bind:value={ratesInput} on:keyup={()=>setRatesOutput(ratesInput)}/>
  </div>
 </div>
 <div class="input">
  <div class="input_btn">
   {#await getDataRate() then _ } 
    <select bind:value={selectedOutput} on:change={()=>setRatesInput(ratesOutput)}>
     {#each resultArray as el}
			<option value={el[1]}>
				{el[0]}
			</option>
		 {/each}
    </select>
  {/await}
  </div>
  <div>
    <input placeholder="enter amount" type="number" bind:value={ratesOutput} on:keyup={()=>setRatesInput(ratesOutput)}/>
  </div>
 </div>
</main>


