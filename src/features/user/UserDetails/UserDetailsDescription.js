import React from 'react';
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';
import format from 'date-fns/format';
import moment from 'moment';

const UserDetailsDescription = ({ profile }) => {
  const { displayName, occupation, createdAt, origin, about, interests } = profile;
  let accountCreatedDate;

  if (createdAt) {
    accountCreatedDate = format(moment(createdAt).toDate(), 'MMM Do YYYY');
  }

  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header content={`About ${displayName}`} />
            <p>I am a: <strong>{occupation || 'tbn'}</strong></p>
            <p>Originally from <strong>{origin || 'tbn'}</strong></p>
            <p>Member Since: <strong>{accountCreatedDate}</strong></p>
            <p>{about || 'tbn'}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header content='Interests' />
            {
              interests && interests.length > 0 ?
                <List>
                  {
                    interests && interests.map((interest, index) => (
                      <Item key={index}>
                        <Icon name='heart' />
                        <Item.Content>{interest.charAt(0).toUpperCase() + interest.slice(1)}</Item.Content>
                      </Item>
                    ))
                  }
                </List> : <p>No interests</p>
            }
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailsDescription