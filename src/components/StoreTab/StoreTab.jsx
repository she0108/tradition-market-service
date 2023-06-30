import { styled } from "styled-components";
import StoreList from "./StoreList";


const StoreTab = ({ marketIndex, storeNumber }) => {
    //react-bottom-drawer 라이브러리 사용 예정


    return (
        <Wrapper>
            <StoreList marketIndex={marketIndex} storeNumber={storeNumber} />
        </Wrapper>
    );
}

export default StoreTab;

//styled
const Wrapper = styled.div`
    width: 100%;
`;