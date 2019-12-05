import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
interface Props {
  nextWatering: number;
}

interface TextProps {
  day: string;
  color: string;
}

const NextWatering = (props: Props) => {
  const getTextProps = (daysToNextWatering: number): TextProps => {
    let day;
    let color;
    // Water Today
    if (daysToNextWatering === 0) {
      day = 'Today';
      color = '#CCCC00';
      //   color = '#F0E68C';
    }
    // Water Overdue
    else if (daysToNextWatering < 0) {
      color = 'red';
      if (daysToNextWatering === -1) {
        day = 'Yesterday';
      } else if (daysToNextWatering <= -2) {
        day = `${Math.abs(daysToNextWatering)} days ago`;
      }
    }
    // Water in Future
    else if (daysToNextWatering > 0) {
      color = 'green';
      if (daysToNextWatering === 1) {
        day = 'Tomorrow';
      } else if (daysToNextWatering >= 2) {
        day = `In ${daysToNextWatering} days`;
      }
    }
    return { day, color };
  };

  const daysToNextWatering = differenceInCalendarDays(
    new Date(props.nextWatering),
    new Date()
  );
  const textProps = getTextProps(daysToNextWatering);

  return (
    <View style={{ marginTop: 'auto' }}>
      <Text style={{ color: textProps.color }}>
        Needs water {textProps.day}
      </Text>
    </View>
  );
};

export default NextWatering;
