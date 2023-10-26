import Dropdown from 'react-bootstrap/Dropdown'
import {months, years } from './DateOptions'
import {useState} from 'react';

const SetBudget = () => {
    const [selectedYear, setSelectedYear] = useState (null)
    const [selectedMonth, setSelectedMonth] = useState (null)


    console.log(selectedYear)
    return (
        <>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Year
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
            {years.map((year)=> (
          <Dropdown.Item onClick={year => setSelectedYear(year)}>{year.value}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <br></br>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Month
              </Dropdown.Toggle>
   
              <Dropdown.Menu>
              {months.map((month)=> (
          <Dropdown.Item onClick={month => setSelectedMonth(month)}>{month.value}</Dropdown.Item>
            ))}
              </Dropdown.Menu>
            </Dropdown>
            </>
    )


} 

export default SetBudget