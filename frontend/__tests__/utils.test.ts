import { formatLongDate, formatShortDate, formatTag } from 'utils';

describe('formatLongDate', (): void => {
  test('January', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`1-${day}-2019`))).toEqual(
        `January ${day}, 2019`
      );
    }
  });

  test('February', (): void => {
    for (let day = 1; day <= 29; day++) {
      expect(formatLongDate(new Date(`2-${day}-2016`))).toEqual(
        `February ${day}, 2016`
      );
    }
  });

  test('March', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`3-${day}-2019`))).toEqual(
        `March ${day}, 2019`
      );
    }
  });

  test('April', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatLongDate(new Date(`4-${day}-2019`))).toEqual(
        `April ${day}, 2019`
      );
    }
  });

  test('May', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`5-${day}-2019`))).toEqual(
        `May ${day}, 2019`
      );
    }
  });

  test('June', (): void => {
    for (let day = 30; day <= 30; day++) {
      expect(formatLongDate(new Date(`6-${day}-2019`))).toEqual(
        `June ${day}, 2019`
      );
    }
  });

  test('July', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`7-${day}-2019`))).toEqual(
        `July ${day}, 2019`
      );
    }
  });

  test('August', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`8-${day}-2019`))).toEqual(
        `August ${day}, 2019`
      );
    }
  });

  test('September', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatLongDate(new Date(`9-${day}-2019`))).toEqual(
        `September ${day}, 2019`
      );
    }
  });

  test('October', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`10-${day}-2019`))).toEqual(
        `October ${day}, 2019`
      );
    }
  });

  test('November', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatLongDate(new Date(`11-${day}-2019`))).toEqual(
        `November ${day}, 2019`
      );
    }
  });

  test('December', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatLongDate(new Date(`12-${day}-2019`))).toEqual(
        `December ${day}, 2019`
      );
    }
  });
});

describe('formatShortDate', (): void => {
  test('January', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`1-${day}-2019`))).toEqual(
        `1/${day}/2019`
      );
    }
  });

  test('February', (): void => {
    for (let day = 1; day <= 29; day++) {
      expect(formatShortDate(new Date(`2-${day}-2016`))).toEqual(
        `2/${day}/2016`
      );
    }
  });

  test('March', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`3-${day}-2019`))).toEqual(
        `3/${day}/2019`
      );
    }
  });

  test('April', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatShortDate(new Date(`4-${day}-2019`))).toEqual(
        `4/${day}/2019`
      );
    }
  });

  test('May', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`5-${day}-2019`))).toEqual(
        `5/${day}/2019`
      );
    }
  });

  test('June', (): void => {
    for (let day = 30; day <= 30; day++) {
      expect(formatShortDate(new Date(`6-${day}-2019`))).toEqual(
        `6/${day}/2019`
      );
    }
  });

  test('July', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`7-${day}-2019`))).toEqual(
        `7/${day}/2019`
      );
    }
  });

  test('August', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`8-${day}-2019`))).toEqual(
        `8/${day}/2019`
      );
    }
  });

  test('September', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatShortDate(new Date(`9-${day}-2019`))).toEqual(
        `9/${day}/2019`
      );
    }
  });

  test('October', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`10-${day}-2019`))).toEqual(
        `10/${day}/2019`
      );
    }
  });

  test('November', (): void => {
    for (let day = 1; day <= 30; day++) {
      expect(formatShortDate(new Date(`11-${day}-2019`))).toEqual(
        `11/${day}/2019`
      );
    }
  });

  test('December', (): void => {
    for (let day = 1; day <= 31; day++) {
      expect(formatShortDate(new Date(`12-${day}-2019`))).toEqual(
        `12/${day}/2019`
      );
    }
  });
});

describe('formatTag', (): void => {
  test('one word', (): void => {
    expect(formatTag('Animals')).toEqual('Animals');
  });

  test('two words separated by underscore', (): void => {
    expect(formatTag('Video_Game')).toEqual('Video Game');
  });

  test('two words separated by space', (): void => {
    expect(formatTag('Board Game')).toEqual('Board Game');
  });

  test('compound word', (): void => {
    expect(formatTag('high-quality')).toEqual('high-quality');
  });

  test('word with apostrophe', (): void => {
    expect(formatTag("Brennan's")).toEqual("Brennan's");
  });

  test('whole shebang', (): void => {
    expect(formatTag("Brennan's_high-quality tag")).toEqual(
      "Brennan's high-quality tag"
    );
  });
});
