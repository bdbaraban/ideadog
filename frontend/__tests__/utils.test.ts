import { formatLongDate, formatShortDate, formatTag } from 'utils';

test('formatLongDate correctly formats all day/month combinations', (): void => {
  // January
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`1-${day}-2019`))).toEqual(
      `January ${day}, 2019`
    );
  }

  // February
  for (let day = 1; day <= 29; day++) {
    expect(formatLongDate(new Date(`2-${day}-2016`))).toEqual(
      `February ${day}, 2016`
    );
  }

  // March
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`3-${day}-2019`))).toEqual(
      `March ${day}, 2019`
    );
  }

  // April
  for (let day = 1; day <= 30; day++) {
    expect(formatLongDate(new Date(`4-${day}-2019`))).toEqual(
      `April ${day}, 2019`
    );
  }

  // May
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`5-${day}-2019`))).toEqual(
      `May ${day}, 2019`
    );
  }

  // June
  for (let day = 30; day <= 30; day++) {
    expect(formatLongDate(new Date(`6-${day}-2019`))).toEqual(
      `June ${day}, 2019`
    );
  }

  // July
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`7-${day}-2019`))).toEqual(
      `July ${day}, 2019`
    );
  }

  // August
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`8-${day}-2019`))).toEqual(
      `August ${day}, 2019`
    );
  }

  // September
  for (let day = 1; day <= 30; day++) {
    expect(formatLongDate(new Date(`9-${day}-2019`))).toEqual(
      `September ${day}, 2019`
    );
  }

  // October
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`10-${day}-2019`))).toEqual(
      `October ${day}, 2019`
    );
  }

  // November
  for (let day = 1; day <= 30; day++) {
    expect(formatLongDate(new Date(`11-${day}-2019`))).toEqual(
      `November ${day}, 2019`
    );
  }

  // December
  for (let day = 1; day <= 31; day++) {
    expect(formatLongDate(new Date(`12-${day}-2019`))).toEqual(
      `December ${day}, 2019`
    );
  }
});

test('formatShortDate correctly formats all day/month combinations', (): void => {
  // January
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`1-${day}-2019`))).toEqual(`1/${day}/2019`);
  }

  // February
  for (let day = 1; day <= 29; day++) {
    expect(formatShortDate(new Date(`2-${day}-2016`))).toEqual(`2/${day}/2016`);
  }

  // March
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`3-${day}-2019`))).toEqual(`3/${day}/2019`);
  }

  // April
  for (let day = 1; day <= 30; day++) {
    expect(formatShortDate(new Date(`4-${day}-2019`))).toEqual(`4/${day}/2019`);
  }

  // May
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`5-${day}-2019`))).toEqual(`5/${day}/2019`);
  }

  // June
  for (let day = 30; day <= 30; day++) {
    expect(formatShortDate(new Date(`6-${day}-2019`))).toEqual(`6/${day}/2019`);
  }

  // July
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`7-${day}-2019`))).toEqual(`7/${day}/2019`);
  }

  // August
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`8-${day}-2019`))).toEqual(`8/${day}/2019`);
  }

  // September
  for (let day = 1; day <= 30; day++) {
    expect(formatShortDate(new Date(`9-${day}-2019`))).toEqual(`9/${day}/2019`);
  }

  // October
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`10-${day}-2019`))).toEqual(
      `10/${day}/2019`
    );
  }

  // November
  for (let day = 1; day <= 30; day++) {
    expect(formatShortDate(new Date(`11-${day}-2019`))).toEqual(
      `11/${day}/2019`
    );
  }

  // December
  for (let day = 1; day <= 31; day++) {
    expect(formatShortDate(new Date(`12-${day}-2019`))).toEqual(
      `12/${day}/2019`
    );
  }
});

test('formatTag correctly handles tag combinations', (): void => {
  expect(formatTag('animals')).toEqual('Animals');
  expect(formatTag('video_game')).toEqual('Video Game');
  expect(formatTag('board game')).toEqual('Board Game');
  expect(formatTag('Dogs')).toEqual('Dogs');
  expect(formatTag('dogs_and_Cats')).toEqual('Dogs And Cats');
});
