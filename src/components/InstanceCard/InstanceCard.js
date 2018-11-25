import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.state.prepareInstance.game_name}
          className={classes.media}
          height="auto"
          image={props.state.prepareInstance.game_image}
          title={props.state.prepareInstance.game_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.state.prepareInstance.game_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({state});

export default withStyles(styles)(connect(mapStateToProps)(ImgMediaCard));