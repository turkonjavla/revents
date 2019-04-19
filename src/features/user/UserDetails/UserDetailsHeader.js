import React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';

/* Date Handlers */
import differenceInYears from 'date-fns/difference_in_years';
import moment from 'moment';

const UserDetailsHeader = ({ profile }) => {
  const { displayName, photoURL, city, occupation, dateOfBirth } = profile;
  let age;

  if (dateOfBirth) {
    age = differenceInYears(Date.now(), moment(dateOfBirth).toDate());
  }
  else {
    age = 'Age not specified';
  }

  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image avatar size='small' src={photoURL || '/assets/user.png'} />
            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{displayName}</Header>
              <br />
              <Header as='h3'>{occupation}</Header>
              <br />
              <Header as='h3'>{age}, Lives in {city || 'Unknow city'}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailsHeader