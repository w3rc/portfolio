import React from 'react';

const Portfolio = ({ data }) => {
	if (!data || !data.projects) return null;

	const projects = data.projects.map((project) => {
		const projectImage = `images/screenshots/${project.image}`;
		return (
			<div key={project.title} className='columns portfolio-item'>
				<div
					style={{
						display: 'flex',
						flexFlow: 'column',
						alignItems: 'center',
					}}
				>
					<div style={{ backgroundColor: '#313131' }}>
						<img
							alt={project.title}
							src={projectImage}
							style={{
								flex: 1,
								objectFit: 'contain',
							}}
						/>
						<div className='overlay'>
							<div className='portfolio-item-meta'>
								<h5>{project.title}</h5>
								<p>{project.description}</p>
							</div>
						</div>
					</div>
					<div style={{ marginTop: 20 }}></div>
					<a
						target='_blank'
						rel="noopener noreferrer"
						href={project.deploy}
						style={{
							backgroundColor: '#515151',
							width: '100%',
							textAlign: 'center',
							textDecoration: 'none',
							color: 'white',
							fontSize: 18,
						}}
					>
						Demo
					</a>
					<div style={{ marginTop: 10 }}></div>
					<a
						target='_blank'
						rel="noopener noreferrer"
						href={project.source}
						style={{
							backgroundColor: '#515151',
							width: '100%',
							textAlign: 'center',
							textDecoration: 'none',
							color: 'white',
							fontSize: 18,
						}}
					>
						Source Code
					</a>
				</div>
			</div>
		);
	});

	return (
		<section id='portfolio'>
			<div className='row'>
				<div className='twelve columns collapsed'>
					<h1>Check Out Some of My Works.</h1>

					<div
						id='portfolio-wrapper'
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
						className='bgrid-quarters s-bgrid-thirds cf'
					>
						{projects}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
