import { Link as RouterLink } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const headLinkStyle = {
	textAlign: 'center',
	textDecoration: 'none',
	color: 'blue'
}

const detailLinkStyle = {
	textDecoration: 'none',
	color: 'blue'
}

function CategoryCard(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const categoryName = props.categoryName;

	const contens = props.contents.map((e) => {
		return (
			<>
				<RouterLink
					to={`/contents/${categoryName}/${e}`}
					style={detailLinkStyle}
					key={`${categoryName}-${e}`}>
					{e}
				</RouterLink>
				<br />
			</>
		)
	});

	return (
		<Card sx={{ width: 200, m: 2, boxShadow: 3 }}>
			<RouterLink
				to={`/list/${categoryName}`}
				style={headLinkStyle}
			>
				<CardHeader
					title={categoryName}
				>
				</CardHeader>
				<CardMedia
					component="img"
					height="128"
					image={`${process.env.PUBLIC_URL}/images/index/${categoryName}.png`}
					alt={categoryName}
					sx={{ px: 4, width: 136, }}
				/>
			</RouterLink>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{'説明'}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>
						{contens}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default CategoryCard;
