import './NoData.scss';

type NodataProps = {
  message?: string;
};

const Nodata = ({ message = '沒有資料可顯示' }: NodataProps) => {
  return <h1 className="noData__message">{message}</h1>;
};

export default Nodata;
