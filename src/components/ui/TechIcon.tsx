import type { IconType } from 'react-icons'
import { FaAws, FaCss3Alt, FaJava } from 'react-icons/fa'
import { FiCode, FiCpu } from 'react-icons/fi'
import {
  SiAngular,
  SiBlazor,
  SiBootstrap,
  SiConfluence,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGrafana,
  SiHtml5,
  SiInfluxdb,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPaypal,
  SiPhp,
  SiPostman,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSpring,
  SiSqlite,
  SiTensorflow,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si'
import { TbBrandAzure, TbBrandCSharp } from 'react-icons/tb'

/**
 * Maps a technology name (as written in config/site.ts) to a brand icon.
 * Unknown technologies fall back to a generic code icon — add new entries here.
 */
const iconMap: Record<string, IconType> = {
  Java: FaJava,
  Python: SiPython,
  MicroPython: SiPython,
  'C#': TbBrandCSharp,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  React: SiReact,
  Angular: SiAngular,
  Blazor: SiBlazor,
  HTML5: SiHtml5,
  CSS: FaCss3Alt,
  Bootstrap: SiBootstrap,
  WordPress: SiWordpress,
  'Spring Boot': SiSpring,
  'ASP.NET Core': SiDotnet,
  '.NET': SiDotnet,
  'Entity Framework Core': SiDotnet,
  'Python.NET': SiDotnet,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'PayPal API': SiPaypal,
  TensorFlow: SiTensorflow,
  YOLOv5: FiCpu,
  OpenCV: SiOpencv,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Redis: SiRedis,
  InfluxDB: SiInfluxdb,
  Docker: SiDocker,
  Jenkins: SiJenkins,
  'GitLab CI/CD': SiGitlab,
  GitHub: SiGithub,
  Git: SiGit,
  AWS: FaAws,
  Azure: TbBrandAzure,
  'Azure DevOps': TbBrandAzure,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Jira: SiJira,
  Confluence: SiConfluence,
  Postman: SiPostman,
  M5Stack: FiCpu,
}

interface TechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = iconMap[name] ?? FiCode
  return <Icon className={className} aria-hidden="true" />
}
