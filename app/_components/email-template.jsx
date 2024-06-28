import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({ response }) => (
  <Html>
    <Head />
    <Preview>File Shared With You</Preview>
    <Body style={styles.main}>
      <Container>
        <Section style={styles.logo}></Section>
        <Section style={styles.content}>
          <Row>
            <Column>
              <Heading style={styles.heading}>
                Hi {response?.emailToSend?.split("@")[0]},
              </Heading>
              <Heading as="h2" style={styles.subHeading}>
                Someone Shared A file With you
              </Heading>
              <Text style={styles.paragraph}><b>File Name: {response.fileName}</b></Text>
              <Text style={{ ...styles.paragraph, marginTop: -5 }}><b>File Size: {response.fileSize}</b></Text>
              <Text style={{ ...styles.paragraph, marginTop: -5 }}><b>File Type: {response.fileType}</b></Text>
              <Text style={styles.note}>
                *Access and Download file on Your Own Risk
              </Text>
              <Text style={styles.paragraph}>
                You Can Share this File with others Also
              </Text>
              <Text style={{ ...styles.paragraph, marginTop: -5 }}>
                Click The Button Below to Access Your File
              </Text>
              <a href={response?.shortUrl} style={styles.link}>
                Click to Download
              </a>
            </Column>
          </Row>
          <Row style={{ ...styles.boxInfos, paddingTop: "0" }}>
            <Column style={styles.containerButton} colSpan={2}>
              <Button style={styles.button} href={response?.shortUrl}>
                Click Here To Download
              </Button>
            </Column>
          </Row>
        </Section>
        <Section style={styles.containerImageFooter}></Section>
        <Text style={styles.footerText}>
          © 2022 | ShareIt, U.S.A. | www.yelp.com
        </Text>
      </Container>
    </Body>
  </Html>
);

const styles = {
  main: {
    backgroundColor: "#fff",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  paragraph: {
    fontSize: 16,
  },
  logo: {
    padding: "30px 20px",
  },
  containerButton: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  },
  content: {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  },
  boxInfos: {
    padding: "20px",
  },
  containerImageFooter: {
    padding: "45px 0 0 0",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  note: {
    color: "rgb(0,0,0, 0.5)",
    fontSize: 14,
    marginTop: -5,
  },
  link: {
    display: "inline-block",
    marginTop: 10,
    textDecoration: "underline",
    color: "#e00707",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "rgb(0,0,0, 0.7)",
  },
};
