import { use100vh } from 'react-div-100vh';
import './Layout.scss';

interface IProps {
  children?: React.ReactNode;
}

const Layout = (props: IProps) => {
  const { children } = props;
  const height = use100vh() as number;
  return (
    <section className="layout">
      <section
        className="layout__wrapper"
        style={{ height }}
      >
        {children}
      </section>
    </section>
  );
};

const LayoutPageHeader = (props: IProps) => {
  const { children } = props;
  return <header className="layout__pageHeader">{children}</header>;
};

const LayoutNavBar = (props: IProps) => {
  const { children } = props;
  return <section className="layout__navBar">{children}</section>;
};

const LayoutMain = (props: IProps) => {
  const { children } = props;
  return <main className="layout__main">{children}</main>;
};

const LayoutModal = (props: IProps) => {
  const { children } = props;
  return <section className="layout__modal">{children}</section>;
};

export { Layout, LayoutPageHeader, LayoutNavBar, LayoutMain, LayoutModal };
