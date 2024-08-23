import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../Contexts/BasketStates';
import { BasketDataModel } from '../../types/BasketModels';
import Loading from '../Loading';
import "./Table.css";

const DATA_PAGE_COUNT = 100;

const Table = () => {
  const [slicedData, setSlicedData] = useState([]);
  const [loadCount, setLoadCount] = useState(DATA_PAGE_COUNT);
  const [scrolledY, setScrolledY] = useState(0);

  const { addRemoveBasketData, betsData } = useContext(GlobalContext);

  useEffect(() => {
    if (betsData) {
      setSlicedData(betsData.slice(0, DATA_PAGE_COUNT));
    }
  }, [betsData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, [scrolledY]);

  const handleTableDisplayCount = () => {
    setLoadCount(loadCount + DATA_PAGE_COUNT);
    setSlicedData(betsData.slice(0, loadCount));
  };

  const handleScrollEnd = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollY = window.scrollY;
    setScrolledY(scrollY);
    const documentHeight = document.body.offsetHeight;
    if (scrollPosition >= documentHeight - 10) {
      handleTableDisplayCount();
    }
  };

  const toggleButtonColor = (cell) => {
    if (cell.style.backgroundColor === "yellow") {
      cell.style.backgroundColor = "";
    } else {
      const getChilds = cell.parentElement.children;
      for (let index = 0; index < getChilds.length; index++) {
        getChilds[index].style.backgroundColor = "";
      }

      cell.style.backgroundColor = "yellow";
    }
  };

  const handleClick = (item, value, e) => {
    toggleButtonColor(e.target);
    const basketData: BasketDataModel = {
      NID: item.NID,
      MBS: item.MBS,
      C: item.C,
      N: item.N,
      Oran: value,
    };
    addRemoveBasketData(basketData);
  };

  const tableDataTitles = [
    `Event Count: ${slicedData.length}`,
    'Yorumlar',
    '',
    '1',
    'x',
    '2',
    'Alt',
    'Üst',
    'H1',
    '1',
    'x',
    '2',
    'H2',
    '1-x',
    '1-2',
    'x-2',
    'Var',
    'Yok',
    '+99',
  ];

  const renderMatchInfo = (item) => {
    return (<Fragment>
      <b>{item.C}</b>
      <span>{` ${item.T} ${item.N}`}</span>
    </Fragment>)
  };

  const tableData = useMemo(() => {
    return slicedData.map((item) => {
      return [
        [
          {value: `${item.D} ${item.DAY} ${item.LN}`, isClickable: false, NID: item.NID},
          {value: 'Yorumlar', isClickable: false, NID: item.NID},
          {value: '', isClickable: false, NID: item.NID},
          {value: '1', isClickable: false, NID: item.NID},
          {value: 'x', isClickable: false, NID: item.NID},
          {value: '2', isClickable: false, NID: item.NID},
          {value: item.OCG["5"].OC["25"].N, isClickable: false, NID: item.NID},
          {value: item.OCG["5"].OC["26"].N, isClickable: false, NID: item.NID},
          {value: 'H1', isClickable: false, NID: item.NID},
          {value: '1', isClickable: false, NID: item.NID},
          {value: 'x', isClickable: false, NID: item.NID},
          {value: '2', isClickable: false, NID: item.NID},
          {value: 'H2', isClickable: false, NID: item.NID},
          {value: item.OCG["2"].OC["3"].N, isClickable: false, NID: item.NID},
          {value: item.OCG["2"].OC["4"].N, isClickable: false, NID: item.NID},
          {value: item.OCG["2"].OC["5"].N, isClickable: false, NID: item.NID},
          {value: 'Var', isClickable: false, NID: item.NID},
          {value: 'Yok', isClickable: false, NID: item.NID},
          {value: '+99', isClickable: false, NID: item.NID},
        ],
        [
          {value: renderMatchInfo(item), isClickable: false, NID: item.NID},
          {value: 'Yorumlar', isClickable: false, NID: item.NID},
          {value: item.OCG["1"].MBS, isClickable: false, NID: item.NID},
          {value: item.OCG["1"].OC["0"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: item.OCG["1"].OC["1"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: '', isClickable: false},
          {value: item.OCG["5"].OC["25"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: item.OCG["5"].OC["26"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: '', isClickable: false, NID: item.NID},
          {value: '', isClickable: false, NID: item.NID},
          {value: '', isClickable: false, NID: item.NID},
          {value: '', isClickable: false},
          {value: '', isClickable: false},
          {value: item.OCG["2"].OC["3"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: item.OCG["2"].OC["4"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: item.OCG["2"].OC["5"].O, isClickable: true, NID: item.NID, MBS: item.OCG["1"].MBS, C: item.C, N: item.N,},
          {value: '', isClickable: false, NID: item.NID},
          {value: '', isClickable: false, NID: item.NID},
          {value: '3', isClickable: false, NID: item.NID},
        ],
        
      ];
    })
  }, [slicedData]);

  return (
    <div>
      {slicedData.length > 0 ? (
        <table className="bet-table">
          <tbody>
            <tr>
              {tableDataTitles.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
            {tableData.map((item, index) => (
              <Fragment key={index}>
                {item.map((el, trIndex) => (
                  <tr key={trIndex}>
                    {el.map((tdEl, tdIndex) => tdEl.isClickable ? (
                      <td key={tdIndex} onClick={(e) => handleClick({...tdEl}, tdEl.value, e)}>{tdEl.value}</td>
                    ) : (
                      <td key={tdIndex}>{tdEl.value}</td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : <Loading />}
    </div>
  )
}

export default Table;