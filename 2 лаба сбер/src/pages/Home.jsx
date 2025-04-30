import Container from '../components/Container';
import Button from '../components/Button';

function Home() {
  const handleClick = (buttonText) => {
    alert(`О! работает: ${buttonText}`);
  };

  return (
    <div>
      <Container title="Hello World">
        <p>Я хочу велосипед :)</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button variant="primary" onClick={() => handleClick("1 Button")}>
            1 Button
          </Button>
          <Button variant="secondary" onClick={() => handleClick("2 Button")}>
            2 Button
          </Button>
          <Button variant="danger" onClick={() => handleClick("3 Button")}>
            3 Button
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;
//нужно чтобы при нажатии кнопки выводил алерт который будет выводить название кнопки
//PropTypes узнать что это такое