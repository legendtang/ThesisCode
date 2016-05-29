SELECT projects.name,
       c.count AS commits_count,
       i.count AS issues_count,
       w.count AS watchers_count
FROM projects
LEFT JOIN
    (SELECT commits.project_id AS project_id,
            COUNT(commits.id) AS COUNT
     FROM commits
     GROUP BY commits.project_id) AS c ON projects.id = c.project_id
LEFT JOIN
    (SELECT issues.repo_id AS project_id,
            COUNT(issues.id) AS COUNT
     FROM issues
     GROUP BY issues.repo_id) AS i ON i.project_id = projects.id
LEFT JOIN
    (SELECT watchers.repo_id AS project_id,
            COUNT(watchers.user_id) AS COUNT
     FROM watchers
     GROUP BY watchers.repo_id) AS w ON w.project_id = projects.id
WHERE c.COUNT IS NOT NULL
    AND w.COUNT IS NOT NULL;


SELECT projects.`name`,
       Count(p.id)
FROM projects AS p
INNER JOIN projects ON p.forked_from = projects.id
GROUP BY projects.`name`
HAVING Count(p.id) > 1;
