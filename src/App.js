import { useState } from 'react';
import { Modal } from '../src/component/Modal.js';
import './App.css';

function App(props) {
  const [value, setValue] = useState('');
  const [list, setList] = useState([{ orderNumber: '', status: '' }]);

  // const [changeBoolean, setchangeBoolean] = useState(false);

  const [modalInfo, setModalInfo] = useState({ isOpen: false, orderNumber: '' });

  // useEffect ( ()=>{

  // },[] )

  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '-' + month + '-' + day;

  const hours = ('0' + today.getHours()).slice(-2);
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2);

  const timeString = hours + ':' + minutes + ':' + seconds;

  const dateTimeString = dateString + 'T' + timeString;

  function lengthLimit(e) {
    if (e.target.value.length > 4) {
      return;
    }
    setValue(e.target.value);
  }

  const onClick = () => {
    const isNotInclude = list.filter((item) => item.orderNumber === value).length === 0;
    if (isNotInclude) {
      setList((prev) => [{ orderNumber: value, status: 'ready' }, ...prev]);
      setValue('');

      const stateDayTime = '준비중인 날짜 및 시간 : ';
      console.log(stateDayTime + dateTimeString);

      return;
    }

    const isInclude = list.filter((item) => item.orderNumber === value);
    console.log(isInclude);
    const findIndex = list.findIndex((item) => item.orderNumber === value);
    // findIndex를 사용한 이유 : indexOf의 경우 대상이 객체이거나, 특정 대상의 값으로 찾는 것이 아닌 어떤 조건을 가지고 찾을 경우 값을 찾을 기 어렵기 때문이다.

    if (isInclude[0].status === 'ready') {
      const copy = [...list];
      copy[findIndex] = {
        orderNumber: isInclude[0].orderNumber,
        status: 'complete',
      };
      setList(copy);
      setValue('');

      const stateDayTime = '완료인 날짜 및 시간 : ';
      console.log(stateDayTime + dateTimeString);

      const copyModalInfo = { ...modalInfo };
      copyModalInfo.isOpen = true;
      copyModalInfo.orderNumber = value;
      setModalInfo(copyModalInfo);

      setTimeout(function () {
        setModalInfo(false);
      }, 1000);

      // function sleep(ms) {
      //   const loopTime = Date.now() + ms;
      //   while (Date.now() < loopTime) {
      //   }
      // }
      // sleep(1000);
      // setModalInfo(false);

      // // setTimeout(sleep(1000), 0);

      // setTimeout(function () {
      //   setModalInfo(false);
      //   -> 위에서는 copyModalInfo.isOpen의 값을 변경해주기 위해서는 기존의 것을 복사하여 바꿔야지만 그 값이 바뀌었는데 왜 이 부분에서는 그렇게 하지 않아도 값이 잘 변경되는지 질문하기!
      // }, 1000);
      return;
    }

    if (isInclude[0].status === 'complete') {
      const copy = [...list];
      copy[findIndex] = {
        orderNumber: isInclude[0].orderNumber,
        status: 'close',
      };
      const deleteItem = copy.filter((item) => item.orderNumber !== value);
      setList(deleteItem);
      setValue('');

      const stateDayTime = '끝인 날짜 및 시간 : ';
      console.log(stateDayTime + dateTimeString);

      return;
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          min="0"
          onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
          // onInput={lengthLimit(this)}
          value={value}
          onChange={(e) => {
            lengthLimit(e);
            // setValue(e.target.value)
          }}
          placeholder="주문번호를 입력하세요."
          onKeyPress={handleOnKeyPress}
        ></input>
        <button onClick={() => onClick()}>선택</button>
        {value}
      </div>
      <div className="box">
        <div className="state1">주문접수</div>

        {/* object로 만들어서 뺴두기 */}

        <div className="order1">
          <div className="order1Txt">주문이 접수되었습니다.</div>
          <ul>
            {list
              .filter((item) => item.status === 'ready')
              .map((item) => (
                <li key={item.orderNumber} className="list">
                  {item.orderNumber}
                </li>
              ))}
          </ul>
        </div>

        <div className="state2">준비완료</div>

        {/* object로 만들어서 뺴두기 */}

        <div className="order2">
          <div className="order2Txt">준비가 완료되었습니다.</div>
          <ul>
            {list
              .filter((item) => item.status === 'complete')
              .map((item) => (
                <li key={item.orderNumber} className="list">
                  {item.orderNumber}
                </li>
              ))}
          </ul>
          <div></div>
        </div>
        <ul>
          {list
            .filter((item) => item.status === 'close')
            .map((item) => (
              <li key={item.orderNumber} className="list">
                {item.orderNumber}
              </li>
            ))}
        </ul>
      </div>
      {modalInfo.isOpen && (
        <Modal orderNumber={modalInfo.orderNumber} closeModal={() => setModalInfo(!modalInfo.isOpen)}></Modal>
      )}
    </div>
  );
}
export default App;
