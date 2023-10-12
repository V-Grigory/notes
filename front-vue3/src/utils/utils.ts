class Utils {
  getRandomValueFrom(values: any[]) {
    if (!values.length) {
      return null;
    }

    if (values.length === 1) {
      const [value] = values;
      return value;
    }

    const getRandomIndex = () => {
      const min = 1;
      const max = values.length;
      const randomNumber = Math.round(
        min - 0.5 + Math.random() * (max - min + 1)
      );
      return randomNumber - 1;
    };

    return values[getRandomIndex()];
  }
}

export default Utils;
