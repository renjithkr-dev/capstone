
    const today=new Date()
    const todayString=`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    export const getTodayString=()=>{
        const td=new Date()
        let mnStr=(td.getMonth()+1).toString().padStart(2,"0")
        let dStr=(td.getDate()).toString().padStart(2,"0")
        let yStr=td.getFullYear().toString()

        return `${yStr}-${mnStr}-${dStr}`
    }