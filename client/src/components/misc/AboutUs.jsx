import React from 'react';
import { Container, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Centralized Public Property Management Platform Proposal
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        Project Overview:
      </Typography>

      <Typography variant="body1" paragraph>
        Our proposal aims to address the challenges associated with reporting and managing damaged public property.
        The current process often lacks efficiency and transparency, leading to delayed response times and inadequate resolution of issues.
        To tackle these issues, we propose the development of a centralized platform that will streamline the reporting and management process,
        ensuring a more effective and collaborative approach.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        Objectives:
      </Typography>

      <Typography variant="body1" paragraph>
        The primary objectives of this project are as follows:
        <ol>
          <li>Streamline Reporting: Develop a user-friendly interface that enables individuals to easily report damaged public property.
            This will include features such as uploading photos, providing location details, and describing the issue.
          </li>
          <li>Facilitate Collaboration: Allow users to interact with reported posts by reacting, commenting, and providing feedback.
            This will encourage a sense of community involvement and enable collective problem-solving.
          </li>
          <li>Prioritize Tasks: Implement an administrative module that will analyze user interaction and prioritize tasks based on their
            level of urgency and impact. This will ensure that resources are allocated efficiently and issues are addressed in a timely manner.
          </li>
        </ol>
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        Functionality:
      </Typography>

      <Typography variant="body1" paragraph>
        The centralized platform will offer the following key features:
        <ol>
          <li>Reporting: Users can create posts to report damaged public property, including photos, location details, and a description
            of the issue. They can also track the status of their reports.
          </li>
          <li>Interaction: Other individuals can react, comment, and provide feedback on reported posts. This promotes collaboration and
            encourages community engagement.
          </li>
          <li>Administrative Dashboard: An administrative module will provide a dashboard for administrators to manage and prioritize
            reported issues. It will utilize algorithms to analyze user interactions and allocate resources accordingly.
          </li>
          <li>Notifications: Users will receive notifications about the progress of their reported issues, ensuring transparency and
            keeping them informed throughout the resolution process.
          </li>
        </ol>
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        Expected Outcomes:
      </Typography>

      <Typography variant="body1" paragraph>
        By implementing this centralized platform, we anticipate the following outcomes:
        <ol>
          <li>Improved Efficiency: The streamlined reporting process and task prioritization will lead to quicker response times and
            more efficient management of damaged public property.
          </li>
          <li>Enhanced Collaboration: The interactive features will foster a sense of community involvement, enabling individuals to
            contribute their insights and suggestions for problem-solving.
          </li>
          <li>Transparent Communication: The platform will provide clear and timely notifications, keeping users informed about the
            progress of their reported issues and promoting transparency in the resolution process.
          </li>
          <li>Data-Driven Insights: The platform will generate valuable data on reported issues, user interactions, and resolution times.
            This information can be used for future planning, resource allocation, and decision-making.
          </li>
        </ol>
      </Typography>
    </Container>
  );
}

export default AboutUs;
