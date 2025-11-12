import { useEffect, useState } from "react"

const Ichs = () => {
    const colors = ['pink', 'green', 'blue', 'yellow', 'red', 'black']
    const [secrete, setScrete] = useState([])
    const [current, setCurrent] = useState([])
    const [all, setAll] = useState([])
    const [flag, setFlag] = useState(false)
    const [message, setMessage] = useState("")
    const [times, setTimes] = useState(0)
    const start = () => {
        setCurrent([])
        setAll([])
        setFlag(false)
        setMessage("")
        setTimes(0)
        generateSecrete()
    }
    const generateSecrete = () => {
        let code = []
        for (let i = 0; i < 4; i++) {
            const ran = Math.floor(Math.random() * 6)
            let j = 0
            if (code.includes(colors[ran])) {
                i--
                continue
            }
            code.push(colors[ran])
        }
        setScrete(code)
    }

    useEffect(() => { generateSecrete(); }, [])
    const check = () => {
        let bool = 0
        let pgia = 0
        for (let i = 0; i < current.length; i++) {
            if (current[i] === secrete[i])
                bool++
        }
        if (bool == 4) {
            setMessage("הצלחת!!")
            setFlag(true)
            return
        }
        //אדום כחול ירוק ורוד
        //ירוק אדום כחול צהוב
        for (let i = 0; i < secrete.length; i++)
            for (let j = 0; j < current.length; j++) {
                if (secrete[i] === current[j] && i !== j) {
                    pgia++
                    break
                }
            }
        console.log(current);
        console.log(secrete);
        setMessage(`pgia ${pgia} bool ${bool}`)
    }
    const addCurrent = (item) => {
        if (current.includes(item)) return;
        setCurrent(prev => [...prev, item]);
    }
    const prev = () => {
        if (current.length == 4) {
            setAll(prev => [...prev, [...current]])
            check()
            setCurrent([])
            setTimes(times + 1)
            if (times === 8) {
                setMessage("לא הצלחת....")
                setFlag(true)
            }
            console.log(all)
        }
    }
    useEffect(() => {

        prev()
    }, [current])

    return (
        <>
            {colors.map((item, index) => {
                return <button disabled={flag} key={index} onClick={() => { addCurrent(item) }} style={{ backgroundColor: item ,width:'50px',height:'20px'}}></button>
            })}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap', width: '240px' }}>{
                all.map(item => {
                    console.log(item);

                    return item.map(i => {
                        return < div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '50px', height: '50px', backgroundColor: i }}></div>
                    })
                })
            }
            </div >
            <div style={{ margin:'10px',display: 'flex', flexDirection: 'row', gap: '10px' }}> {current.map((item) => {
                return <div style={{ width: '50px', height: '50px', backgroundColor: item }}></div>
            })}</div>
            <div>{message}</div>
            <button onClick={start}>משחק חדש</button>
        </>
    )
}
export default Ichs